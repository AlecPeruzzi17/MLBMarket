import hashlib
import hmac
import json
import mimetypes
import os
import secrets
import sqlite3
from http import HTTPStatus
from http.cookies import SimpleCookie
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import parse_qs, urlparse


ROOT = Path(__file__).resolve().parent
DB_PATH = ROOT / "your_lineup.db"
SESSION_COOKIE = "yl_session"
INITIAL_BALANCE = 42.50
LOBBY_BUY_INS = [0.5, 1, 5, 10, 20, 50, 100, 500]
LOBBY_SIZES = [5, 10, 20]


def db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db():
    with db() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              username TEXT NOT NULL UNIQUE,
              email TEXT NOT NULL UNIQUE,
              password_hash TEXT NOT NULL,
              salt TEXT NOT NULL,
              balance REAL NOT NULL DEFAULT 42.5,
              created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS sessions (
              token TEXT PRIMARY KEY,
              user_id INTEGER NOT NULL,
              created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS lobbies (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              buy_in REAL NOT NULL,
              size INTEGER NOT NULL,
              status TEXT NOT NULL DEFAULT 'open',
              created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS lobby_entries (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              lobby_id INTEGER NOT NULL,
              user_id INTEGER NOT NULL,
              joined_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
              score REAL NOT NULL DEFAULT 0,
              payout REAL NOT NULL DEFAULT 0,
              UNIQUE(lobby_id, user_id),
              FOREIGN KEY (lobby_id) REFERENCES lobbies(id) ON DELETE CASCADE,
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            """
        )


def hash_password(password, salt=None):
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 200_000)
    return digest.hex(), salt


def verify_password(password, stored_hash, salt):
    digest, _ = hash_password(password, salt)
    return hmac.compare_digest(digest, stored_hash)


def serialize_user(row):
    return {
        "id": row["id"],
        "username": row["username"],
        "email": row["email"],
        "balance": round(float(row["balance"]), 2),
    }


def parse_cookie(header):
    cookie = SimpleCookie()
    if header:
        cookie.load(header)
    morsel = cookie.get(SESSION_COOKIE)
    return morsel.value if morsel else None


class AppHandler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        print("%s - %s" % (self.address_string(), fmt % args))

    def read_json(self):
        length = int(self.headers.get("Content-Length", "0") or "0")
        if not length:
            return {}
        return json.loads(self.rfile.read(length).decode("utf-8"))

    def send_json(self, payload, status=HTTPStatus.OK, headers=None):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        for key, value in (headers or {}).items():
            self.send_header(key, value)
        self.end_headers()
        self.wfile.write(body)

    def send_error_json(self, message, status=HTTPStatus.BAD_REQUEST):
        self.send_json({"error": message}, status)

    def current_user(self):
        token = parse_cookie(self.headers.get("Cookie"))
        if not token:
            return None
        with db() as conn:
            return conn.execute(
                """
                SELECT users.*
                FROM sessions
                JOIN users ON users.id = sessions.user_id
                WHERE sessions.token = ?
                """,
                (token,),
            ).fetchone()

    def require_user(self):
        user = self.current_user()
        if not user:
            self.send_error_json("Log in before continuing.", HTTPStatus.UNAUTHORIZED)
            return None
        return user

    def create_session_headers(self, user_id):
        token = secrets.token_urlsafe(32)
        with db() as conn:
            conn.execute("INSERT INTO sessions (token, user_id) VALUES (?, ?)", (token, user_id))
        return {
            "Set-Cookie": f"{SESSION_COOKIE}={token}; Path=/; HttpOnly; SameSite=Lax"
        }

    def lobby_payload(self, conn, lobby_id, current_user_id):
        lobby = conn.execute("SELECT * FROM lobbies WHERE id = ?", (lobby_id,)).fetchone()
        entries = conn.execute(
            """
            SELECT users.id, users.username, lobby_entries.score, lobby_entries.payout
            FROM lobby_entries
            JOIN users ON users.id = lobby_entries.user_id
            WHERE lobby_entries.lobby_id = ?
            ORDER BY lobby_entries.joined_at ASC
            """,
            (lobby_id,),
        ).fetchall()
        return {
            "id": lobby["id"],
            "buyIn": float(lobby["buy_in"]),
            "size": lobby["size"],
            "entries": [
                {
                    "id": row["id"],
                    "name": row["username"],
                    "score": float(row["score"]),
                    "payout": float(row["payout"]),
                    "isCurrentUser": row["id"] == current_user_id,
                }
                for row in entries
            ],
        }

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/session":
            user = self.current_user()
            self.send_json({"user": serialize_user(user) if user else None})
            return

        if parsed.path == "/api/lobbies":
            user = self.require_user()
            if not user:
                return
            query = parse_qs(parsed.query)
            size = int(query.get("size", [10])[0])
            if size not in LOBBY_SIZES:
                self.send_error_json("Unsupported lobby size.")
                return
            with db() as conn:
                rows = conn.execute(
                    """
                    SELECT lobbies.id, lobbies.buy_in, lobbies.size, COUNT(lobby_entries.id) AS seated
                    FROM lobbies
                    LEFT JOIN lobby_entries ON lobby_entries.lobby_id = lobbies.id
                    WHERE lobbies.status = 'open' AND lobbies.size = ?
                    GROUP BY lobbies.id
                    ORDER BY lobbies.buy_in ASC, lobbies.id ASC
                    """,
                    (size,),
                ).fetchall()
            self.send_json(
                {
                    "lobbies": [
                        {
                            "id": row["id"],
                            "buyIn": float(row["buy_in"]),
                            "size": row["size"],
                            "seated": row["seated"],
                        }
                        for row in rows
                    ]
                }
            )
            return

        self.serve_static(parsed.path)

    def do_POST(self):
        parsed = urlparse(self.path)
        try:
            body = self.read_json()
        except json.JSONDecodeError:
            self.send_error_json("Invalid JSON.")
            return

        if parsed.path == "/api/signup":
            self.handle_signup(body)
            return
        if parsed.path == "/api/login":
            self.handle_login(body)
            return
        if parsed.path == "/api/logout":
            self.handle_logout()
            return
        if parsed.path == "/api/deposit":
            self.handle_deposit(body)
            return
        if parsed.path == "/api/lobbies/join":
            self.handle_join_lobby(body)
            return

        self.send_error_json("Route not found.", HTTPStatus.NOT_FOUND)

    def handle_signup(self, body):
        username = str(body.get("username", "")).strip()
        email = str(body.get("email", "")).strip().lower()
        password = str(body.get("password", ""))

        if len(username) < 3:
            self.send_error_json("Username must be at least 3 characters.")
            return
        if "@" not in email:
            self.send_error_json("Enter a valid email address.")
            return
        if len(password) < 6:
            self.send_error_json("Password must be at least 6 characters.")
            return

        password_hash, salt = hash_password(password)
        try:
            with db() as conn:
                cursor = conn.execute(
                    """
                    INSERT INTO users (username, email, password_hash, salt, balance)
                    VALUES (?, ?, ?, ?, ?)
                    """,
                    (username, email, password_hash, salt, INITIAL_BALANCE),
                )
                user = conn.execute("SELECT * FROM users WHERE id = ?", (cursor.lastrowid,)).fetchone()
        except sqlite3.IntegrityError as error:
            message = "That username or email is already in use."
            if "users.email" in str(error):
                message = "That email already has an account. Log in instead."
            if "users.username" in str(error):
                message = "That username is taken. Try another one."
            self.send_error_json(message)
            return

        self.send_json({"user": serialize_user(user)}, headers=self.create_session_headers(user["id"]))

    def handle_login(self, body):
        identifier = str(body.get("identifier", "")).strip().lower()
        password = str(body.get("password", ""))
        with db() as conn:
            user = conn.execute(
                "SELECT * FROM users WHERE lower(email) = ? OR lower(username) = ?",
                (identifier, identifier),
            ).fetchone()

        if not user or not verify_password(password, user["password_hash"], user["salt"]):
            self.send_error_json("No account matched those credentials.", HTTPStatus.UNAUTHORIZED)
            return

        self.send_json({"user": serialize_user(user)}, headers=self.create_session_headers(user["id"]))

    def handle_logout(self):
        token = parse_cookie(self.headers.get("Cookie"))
        if token:
            with db() as conn:
                conn.execute("DELETE FROM sessions WHERE token = ?", (token,))
        self.send_json(
            {"ok": True},
            headers={"Set-Cookie": f"{SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax"},
        )

    def handle_deposit(self, body):
        user = self.require_user()
        if not user:
            return
        amount = float(body.get("amount", 0))
        if amount <= 0:
            self.send_error_json("Deposit amount must be positive.")
            return
        with db() as conn:
            conn.execute("UPDATE users SET balance = round(balance + ?, 2) WHERE id = ?", (amount, user["id"]))
            updated = conn.execute("SELECT * FROM users WHERE id = ?", (user["id"],)).fetchone()
        self.send_json({"user": serialize_user(updated)})

    def handle_join_lobby(self, body):
        user = self.require_user()
        if not user:
            return
        buy_in = float(body.get("buyIn", 0))
        size = int(body.get("size", 0))
        if buy_in not in LOBBY_BUY_INS or size not in LOBBY_SIZES:
            self.send_error_json("Unsupported lobby.")
            return

        with db() as conn:
            lobby = conn.execute(
                """
                SELECT lobbies.*
                FROM lobbies
                LEFT JOIN lobby_entries ON lobby_entries.lobby_id = lobbies.id
                WHERE lobbies.status = 'open' AND lobbies.buy_in = ? AND lobbies.size = ?
                GROUP BY lobbies.id
                HAVING COUNT(lobby_entries.id) < lobbies.size
                ORDER BY lobbies.id ASC
                LIMIT 1
                """,
                (buy_in, size),
            ).fetchone()

            if not lobby:
                cursor = conn.execute("INSERT INTO lobbies (buy_in, size) VALUES (?, ?)", (buy_in, size))
                lobby_id = cursor.lastrowid
            else:
                lobby_id = lobby["id"]

            existing = conn.execute(
                "SELECT id FROM lobby_entries WHERE lobby_id = ? AND user_id = ?",
                (lobby_id, user["id"]),
            ).fetchone()

            if not existing:
                latest_user = conn.execute("SELECT * FROM users WHERE id = ?", (user["id"],)).fetchone()
                if float(latest_user["balance"]) < buy_in:
                    self.send_error_json(f"You need ${buy_in - float(latest_user['balance']):.2f} more to enter this lobby.")
                    return
                conn.execute("UPDATE users SET balance = round(balance - ?, 2) WHERE id = ?", (buy_in, user["id"]))
                conn.execute("INSERT INTO lobby_entries (lobby_id, user_id) VALUES (?, ?)", (lobby_id, user["id"]))

            seated = conn.execute(
                "SELECT COUNT(*) AS count FROM lobby_entries WHERE lobby_id = ?",
                (lobby_id,),
            ).fetchone()["count"]
            if seated >= size:
                conn.execute("UPDATE lobbies SET status = 'full' WHERE id = ?", (lobby_id,))

            updated_user = conn.execute("SELECT * FROM users WHERE id = ?", (user["id"],)).fetchone()
            lobby_payload = self.lobby_payload(conn, lobby_id, user["id"])

        self.send_json({"user": serialize_user(updated_user), "lobby": lobby_payload})

    def serve_static(self, request_path):
        path = request_path.strip("/") or "index.html"
        file_path = (ROOT / path).resolve()
        if not str(file_path).startswith(str(ROOT)) or not file_path.exists() or file_path.is_dir():
            file_path = ROOT / "index.html"

        content_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"
        body = file_path.read_bytes()
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main():
    init_db()
    port = int(os.environ.get("PORT", "8000"))
    server = ThreadingHTTPServer(("127.0.0.1", port), AppHandler)
    print(f"Your Lineup running at http://127.0.0.1:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
