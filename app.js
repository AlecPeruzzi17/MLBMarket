const lobbyBuyIns = [0.5, 1, 5, 10, 20, 50, 100, 500];
const rosterSlots = ["C", "1B", "2B", "3B", "SS", "OF", "OF", "OF", "SP", "SP"];
const choicesPerRound = 4;
const storageKeys = {
  starters: "yourLineup.todayStarters"
};
const lobbySizes = [5, 10, 20];
const defaultStartingPitchers = [
  { name: "Jake Bennett", team: "BOS", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Drew Rasmussen", team: "TB", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Carlos Rodón", team: "NYY", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Parker Messick", team: "CLE", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Foster Griffin", team: "WSH", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Robbie Ray", team: "SF", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Brady Singer", team: "CIN", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Michael King", team: "SD", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "George Kirby", team: "SEA", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Brandon Young", team: "BAL", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Shohei Ohtani", team: "LAD", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Jared Jones", team: "PIT", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Framber Valdez", team: "DET", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Ryne Nelson", team: "AZ", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Ryan Gusto", team: "MIA", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Jesús Luzardo", team: "PHI", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Max Scherzer", team: "TOR", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Andre Pallante", team: "STL", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Austin Warren", team: "NYM", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "MacKenzie Gore", team: "TEX", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Seth Lugo", team: "KC", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Chris Sale", team: "ATL", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Shota Imanaga", team: "CHC", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Michael Lorenzen", team: "COL", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Brandon Sproat", team: "MIL", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Jack Perkins", team: "ATH", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Peter Lambert", team: "HOU", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" },
  { name: "Reid Detmers", team: "LAA", positions: ["SP"], avg: "SP", ops: "--", opponent: "Today" }
];
const injuredPlayers = new Set([
  "Aaron Judge",
  "Drake Baldwin",
  "Elly De La Cruz",
  "J.P. Crawford",
  "Jared Jones",
  "Konnor Griffin",
  "Max Scherzer",
  "Munetaka Murakami"
]);

const qualifiedHitterRows = `
Brandon Marsh|PHI|OF|.338|.889|Patrick Corbin
Otto Lopez|MIA|SS|.336|.845|Off slate
Jung Hoo Lee|SF|OF|.323|.802|Richard Lovelady
Luis Arraez|SF|2B|.323|.790|Richard Lovelady
Troy Johnston|COL|OF|.314|.800|Off slate
Josh Jung|TEX|3B|.313|.855|Off slate
Nick Gonzales|PIT|3B|.309|.746|Off slate
Michael Harris II|ATL|OF|.306|.863|Off slate
Ernie Clement|TOR|2B|.306|.786|Cristopher Sánchez
Riley Greene|DET|OF|.305|.844|Off slate
Drake Baldwin|ATL|C|.303|.932|Off slate
Jordan Walker|STL|OF|.303|.922|Off slate
Xavier Edwards|MIA|2B|.302|.840|Off slate
Ben Rice|NYY|1B|.299|1.034|Gavin Williams
Willson Contreras|BOS|1B|.296|.927|Ian Seymour
Ezequiel Duran|TEX|2B|.293|.804|Off slate
Kevin McGonigle|DET|SS|.291|.820|Off slate
Alec Burleson|STL|1B|.290|.815|Off slate
Randy Arozarena|SEA|OF|.288|.822|Trey Gibson
Vladimir Guerrero Jr.|TOR|1B|.287|.752|Cristopher Sánchez
CJ Abrams|WSH|SS|.286|.914|Logan Webb
Spencer Horwitz|PIT|1B|.286|.846|Off slate
Ryan O'Hearn|PIT|OF|.286|.826|Off slate
William Contreras|MIL|C|.285|.735|Jeffrey Springs
Corbin Carroll|AZ|OF|.285|.928|Off slate
Ceddanne Rafaela|BOS|OF|.285|.776|Ian Seymour
Andy Pages|LAD|OF|.283|.852|Off slate
Jake Bauers|MIL|1B|.281|.892|Jeffrey Springs
Shea Langeliers|ATH|C|.281|.880|Kyle Harrison
Brice Turang|MIL|2B|.281|.881|Jeffrey Springs
Ildemaro Vargas|AZ|1B|.280|.750|Off slate
Freddie Freeman|LAD|1B|.280|.838|Off slate
Brayan Rocchio|CLE|SS|.280|.766|Will Warren
Elly De La Cruz|CIN|SS|.280|.855|Walker Buehler
Bobby Witt Jr.|KC|SS|.280|.810|Off slate
Wilyer Abreu|BOS|OF|.277|.761|Ian Seymour
Nick Kurtz|ATH|1B|.276|.927|Kyle Harrison
Chandler Simpson|TB|OF|.276|.640|Connelly Early
Junior Caminero|TB|3B|.275|.871|Connelly Early
Juan Soto|NYM|OF|.275|.894|Off slate
Ozzie Albies|ATL|2B|.275|.774|Off slate
Chase Meidroth|CWS|2B|.274|.735|Off slate
Fernando Tatis Jr.|SD|OF|.273|.670|Andrew Abbott
Cody Bellinger|NYY|OF|.272|.845|Gavin Williams
Konnor Griffin|PIT|SS|.270|.729|Off slate
Jonathan Aranda|TB|1B|.269|.836|Connelly Early
TJ Rumfield|COL|1B|.268|.763|Off slate
Matt Olson|ATL|1B|.267|.877|Off slate
Maikel Garcia|KC|3B|.266|.705|Off slate
Spencer Steer|CIN|OF|.266|.792|Walker Buehler
James Wood|WSH|OF|.265|.936|Logan Webb
Carson Benge|NYM|OF|.265|.733|Off slate
Bryce Harper|PHI|1B|.264|.875|Patrick Corbin
Oneil Cruz|PIT|OF|.264|.822|Off slate
Bryan Reynolds|PIT|OF|.263|.805|Off slate
Willi Castro|COL|2B|.262|.703|Off slate
Liam Hicks|MIA|C|.262|.807|Off slate
Mauricio Dubón|ATL|SS|.260|.731|Off slate
Taylor Ward|BAL|OF|.258|.761|Emerson Hancock
Pete Crow-Armstrong|CHC|OF|.258|.784|Off slate
Max Muncy|LAD|3B|.258|.852|Off slate
Julio Rodríguez|SEA|OF|.257|.770|Trey Gibson
Byron Buxton|MIN|OF|.257|.868|Off slate
Nolan Arenado|AZ|3B|.256|.773|Off slate
Luis García Jr.|WSH|1B|.256|.726|Logan Webb
Josh Naylor|SEA|1B|.256|.680|Trey Gibson
Daulton Varsho|TOR|OF|.256|.739|Cristopher Sánchez
Chase DeLauter|CLE|OF|.254|.732|Will Warren
Ronald Acuña Jr.|ATL|OF|.254|.798|Off slate
Daylen Lile|WSH|OF|.254|.720|Logan Webb
Sal Stewart|CIN|1B|.253|.801|Walker Buehler
Nolan Schanuel|LAA|1B|.253|.680|Spencer Arrighetti
Brandon Lowe|PIT|2B|.252|.858|Off slate
Cole Young|SEA|2B|.252|.678|Trey Gibson
Jac Caglianone|KC|OF|.250|.729|Off slate
Brandon Nimmo|TEX|OF|.249|.728|Off slate
Christian Walker|HOU|1B|.248|.815|Grayson Rodriguez
Aaron Judge|NYY|OF|.248|.908|Gavin Williams
Seiya Suzuki|CHC|OF|.247|.752|Off slate
Austin Martin|MIN|OF|.247|.680|Off slate
Nico Hoerner|CHC|2B|.247|.678|Off slate
Ketel Marte|AZ|2B|.246|.743|Off slate
Michael Busch|CHC|1B|.246|.759|Off slate
JJ Wetherholt|STL|2B|.246|.753|Off slate
Matt Chapman|SF|3B|.245|.695|Richard Lovelady
Garrett Mitchell|MIL|OF|.244|.755|Jeffrey Springs
Alex Bregman|CHC|3B|.243|.669|Off slate
Jo Adell|LAA|OF|.243|.675|Spencer Arrighetti
Miguel Vargas|CWS|3B|.242|.859|Off slate
Willy Adames|SF|SS|.242|.734|Richard Lovelady
Hunter Goodman|COL|C|.242|.828|Off slate
Pete Alonso|BAL|1B|.242|.767|Emerson Hancock
Isaac Paredes|HOU|3B|.242|.749|Grayson Rodriguez
Rafael Devers|SF|1B|.240|.712|Richard Lovelady
Munetaka Murakami|CWS|1B|.240|.938|Off slate
Luke Keaschall|MIN|2B|.240|.621|Off slate
Jake Burger|TEX|1B|.237|.705|Off slate
Geraldo Perdomo|AZ|SS|.237|.684|Off slate
José Ramírez|CLE|3B|.237|.770|Will Warren
Brooks Lee|MIN|SS|.237|.693|Off slate
Kyle Tucker|LAD|OF|.236|.716|Off slate
Masyn Winn|STL|SS|.236|.640|Off slate
Kazuma Okamoto|TOR|3B|.235|.748|Cristopher Sánchez
Jeff McNeil|ATH|2B|.235|.615|Kyle Harrison
Dillon Dingler|DET|C|.235|.808|Off slate
Brett Baty|NYM|3B|.235|.640|Off slate
Bo Bichette|NYM|3B|.234|.615|Off slate
Jazz Chisholm Jr.|NYY|2B|.233|.700|Gavin Williams
Angel Martínez|CLE|OF|.232|.689|Will Warren
Ian Happ|CHC|OF|.232|.832|Off slate
Jacob Young|WSH|OF|.232|.673|Logan Webb
Zach Neto|LAA|SS|.231|.778|Spencer Arrighetti
Gavin Sheets|SD|1B|.229|.777|Andrew Abbott
Trea Turner|PHI|SS|.229|.627|Patrick Corbin
Tyler Soderstrom|ATH|OF|.228|.747|Kyle Harrison
J.P. Crawford|SEA|SS|.228|.765|Trey Gibson
Xander Bogaerts|SD|SS|.226|.648|Andrew Abbott
Mike Trout|LAA|OF|.226|.844|Spencer Arrighetti
Marcus Semien|NYM|2B|.226|.639|Off slate
Kyle Karros|COL|3B|.225|.664|Off slate
Colson Montgomery|CWS|SS|.225|.801|Off slate
Alec Bohm|PHI|3B|.224|.641|Patrick Corbin
Andrés Giménez|TOR|SS|.224|.624|Cristopher Sánchez
Sal Frelick|MIL|OF|.223|.607|Jeffrey Springs
Trent Grisham|NYY|OF|.221|.732|Gavin Williams
Gunnar Henderson|BAL|SS|.221|.695|Emerson Hancock
Vinnie Pasquantino|KC|1B|.220|.658|Off slate
Steven Kwan|CLE|OF|.220|.600|Will Warren
Cam Smith|HOU|OF|.219|.658|Grayson Rodriguez
Bryson Stott|PHI|2B|.218|.642|Patrick Corbin
Isaac Collins|KC|OF|.216|.647|Off slate
Mark Vientos|NYM|1B|.214|.618|Off slate
Carter Jensen|KC|C|.213|.667|Off slate
Spencer Torkelson|DET|1B|.212|.712|Off slate
Jarren Duran|BOS|OF|.211|.665|Ian Seymour
Ezequiel Tovar|COL|SS|.209|.582|Off slate
Austin Riley|ATL|3B|.208|.642|Off slate
Matt McLain|CIN|2B|.206|.671|Walker Buehler
Connor Norby|MIA|1B|.205|.642|Off slate
Salvador Perez|KC|C|.204|.599|Off slate
Ramón Laureano|SD|OF|.203|.660|Andrew Abbott
Luis Rengifo|MIL|3B|.202|.529|Jeffrey Springs
Jackson Merrill|SD|OF|.202|.604|Andrew Abbott
Jakob Marsee|MIA|OF|.201|.634|Off slate
Adolis García|PHI|OF|.199|.600|Patrick Corbin
Nolan Gorman|STL|3B|.199|.606|Off slate
Nasim Nuñez|WSH|2B|.199|.509|Logan Webb
Caleb Durbin|BOS|3B|.192|.547|Ian Seymour
Cedric Mullins|TB|OF|.182|.561|Connelly Early
Dansby Swanson|CHC|SS|.180|.607|Off slate
Evan Carter|TEX|OF|.172|.617|Off slate
Manny Machado|SD|3B|.169|.596|Andrew Abbott
`.trim();

const catcherEligibilityRows = `
Carter Jensen|KC|C|.214|.668|MacKenzie Gore
Hunter Goodman|COL|C|.243|.845|Shota Imanaga
Liam Hicks|MIA|C|.261|.803|Ryne Nelson
Nick Fortes|TB|C|.250|.616|Jake Bennett
Salvador Perez|KC|C|.201|.589|MacKenzie Gore
Samuel Basallo|BAL|C|.263|.802|George Kirby
Shea Langeliers|ATH|C|.283|.881|Brandon Sproat
Tyler Stephenson|CIN|C|.212|.654|Michael King
Will Smith|LAD|C|.249|.720|Jared Jones
William Contreras|MIL|C|.286|.744|Jack Perkins
`.trim();

function parseHitterRow(row) {
  const [name, team, positions, avg, ops, opponent] = row.split("|");
  return { name, team, positions: positions.split(","), avg, ops, opponent };
}

const baseQualifiedHitters = qualifiedHitterRows.split("\n").map(parseHitterRow);
const catcherEligibilityHitters = catcherEligibilityRows.split("\n").map(parseHitterRow);
const qualifiedHitters = [
  ...new Map([...baseQualifiedHitters, ...catcherEligibilityHitters].map((player) => [player.name, player])).values()
];

let currentUser = null;
let startingPitchers = loadStoredStarters();
let players = [...qualifiedHitters, ...startingPitchers];
let lobbySummaries = [];

const state = {
  balance: currentUser?.balance ?? 42.5,
  selectedLobbySize: 5,
  activeBuyIn: 0,
  lobby: null,
  results: [],
  resultsSettled: false,
  roster: [],
  currentSlot: null,
  choices: []
};

const els = {
  appShell: document.querySelector("#appShell"),
  accountName: document.querySelector("#accountName"),
  signOutButton: document.querySelector("#signOutButton"),
  loginForm: document.querySelector("#loginForm"),
  signupForm: document.querySelector("#signupForm"),
  authMessage: document.querySelector("#authMessage"),
  balance: document.querySelector("#balance"),
  selectedLobbySize: document.querySelector("#selectedLobbySize"),
  lobbySizeButtons: document.querySelectorAll("[data-lobby-size]"),
  lobbyGrid: document.querySelector("#lobbyGrid"),
  cashierMessage: document.querySelector("#cashierMessage"),
  choiceGrid: document.querySelector("#choiceGrid"),
  slotList: document.querySelector("#slotList"),
  lineupList: document.querySelector("#lineupList"),
  payoutList: document.querySelector("#payoutList"),
  draftStatus: document.querySelector("#draftStatus"),
  roundTitle: document.querySelector("#roundTitle"),
  activeBuyIn: document.querySelector("#activeBuyIn"),
  pickCounter: document.querySelector("#pickCounter"),
  playerPoolStatus: document.querySelector("#playerPoolStatus"),
  resultsStatus: document.querySelector("#resultsStatus"),
  resultsList: document.querySelector("#resultsList"),
  settleResults: document.querySelector("#settleResults"),
  lobbySeatCount: document.querySelector("#lobbySeatCount"),
  lobbyPlayers: document.querySelector("#lobbyPlayers"),
  starterTextarea: document.querySelector("#starterTextarea"),
  saveStarters: document.querySelector("#saveStarters"),
  starterList: document.querySelector("#starterList"),
  starterCount: document.querySelector("#starterCount"),
  batterScoreForm: document.querySelector("#batterScoreForm"),
  pitcherScoreForm: document.querySelector("#pitcherScoreForm"),
  batterScoreResult: document.querySelector("#batterScoreResult"),
  pitcherScoreResult: document.querySelector("#pitcherScoreResult")
};

function money(value) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => (
    {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]
  ));
}

function baseballReferenceId(name) {
  const cleaned = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\b(jr|sr|ii|iii|iv)\b/gi, "")
    .replace(/[^a-z\s-]/gi, " ")
    .trim()
    .toLowerCase()
    .split(/\s+/);
  const first = cleaned[0] || "";
  const last = cleaned[cleaned.length - 1] || first;

  return `${last.replace(/[^a-z]/g, "").slice(0, 5)}${first.replace(/[^a-z]/g, "").slice(0, 2)}01`;
}

function baseballReferencePhotoUrl(name) {
  const id = baseballReferenceId(name);
  return `https://www.baseball-reference.com/req/202408220/images/headshots/${id.charAt(0)}/${id}.jpg`;
}

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The app still works when opened from file:// in browsers that block storage.
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Starter overrides still work when browser storage is available.
  }
}

async function apiRequest(path, options = {}) {
  let response;
  try {
    response = await fetch(path, {
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });
  } catch {
    throw new Error("The backend server is not reachable. Run python server.py and open http://127.0.0.1:8000.");
  }

  const isJson = response.headers.get("Content-Type")?.includes("application/json");
  const payload = isJson ? await response.json().catch(() => ({})) : {};

  if (!response.ok) {
    throw new Error(payload.error || "The backend server is not available here. Run python server.py and open http://127.0.0.1:8000.");
  }

  return payload;
}

function loadStoredStarters() {
  const stored = readStorage(storageKeys.starters);
  if (!stored) return defaultStartingPitchers;
  try {
    const parsed = JSON.parse(stored);
    return parsed.length ? parsed : defaultStartingPitchers;
  } catch {
    return defaultStartingPitchers;
  }
}

function saveStoredStarters(starters) {
  writeStorage(storageKeys.starters, JSON.stringify(starters));
}

function parseStarters(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [namePart, teamPart = "MLB"] = line.split(",").map((part) => part.trim());
      return {
        name: namePart,
        team: teamPart || "MLB",
        positions: ["SP"],
        avg: "SP",
        ops: "--",
        opponent: "Today"
      };
    })
    .filter((player) => player.name);
}

function setPlayerPoolStatus() {
  const starterText = startingPitchers.length
    ? `${startingPitchers.length} projected SPs loaded`
    : "SP pool pending";
  const activeHitters = qualifiedHitters.filter((player) => player.opponent !== "Off slate" && !isInjured(player)).length;
  els.playerPoolStatus.textContent = `${activeHitters} hitters vs listed SP / ${starterText}`;
}

function refreshPlayers() {
  players = [...qualifiedHitters, ...startingPitchers];
  setPlayerPoolStatus();
}

async function addFunds(amount) {
  const payload = await apiRequest("/api/deposit", {
    method: "POST",
    body: JSON.stringify({ amount })
  });
  currentUser = payload.user;
  state.balance = currentUser.balance;
  updateBalance();
  renderAccount();
  return payload.user;
}

function showAuth(message = "") {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === "auth");
  });
  els.authMessage.textContent = message;
}

function switchTab(tabName) {
  if (!currentUser && tabName !== "auth") {
    showAuth("Log in or create an account before entering a lobby.");
    return;
  }

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabName);
  });
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === tabName);
  });
}

function updateBalance() {
  els.balance.textContent = money(state.balance);
}

function renderAccount() {
  if (!currentUser) {
    els.accountName.textContent = "Signed out";
    els.signOutButton.hidden = true;
    els.balance.textContent = money(0);
    showAuth();
    return;
  }

  els.accountName.textContent = currentUser.username;
  els.signOutButton.hidden = false;
}

function renderLobbies() {
  els.lobbyGrid.innerHTML = "";
  els.selectedLobbySize.textContent = `${state.selectedLobbySize} seats`;
  els.lobbySizeButtons.forEach((button) => {
    const size = Number(button.dataset.lobbySize);
    const isSelected = size === state.selectedLobbySize;
    button.classList.toggle("active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  lobbyBuyIns.forEach((buyIn) => {
    const size = state.selectedLobbySize;
    const summary = lobbySummaries.find((item) => item.buyIn === buyIn && item.size === size);
    const button = document.createElement("button");
    button.className = "lobby-card";
    const isActiveLobby = state.lobby?.buyIn === buyIn && state.lobby?.size === size;
    const seated = isActiveLobby ? state.lobby.entries.length : summary?.seated || 0;
    const seatedMeta = seated
      ? `<span class="lobby-meta"><span>${seated} / ${size} seated</span></span>`
      : "";
    button.innerHTML = `
      <span class="eyebrow">${size}-player lobby</span>
      <strong>${money(buyIn)}</strong>
      <span class="first-payout">1st place ${money(payoutTable(buyIn, size)[0])}</span>
      ${seatedMeta}
    `;
    button.addEventListener("click", () => joinLobby(buyIn, size));
    els.lobbyGrid.appendChild(button);
  });
}

async function loadLobbySummaries() {
  if (!currentUser) {
    lobbySummaries = [];
    return;
  }

  try {
    const payload = await apiRequest(`/api/lobbies?size=${state.selectedLobbySize}`);
    lobbySummaries = payload.lobbies || [];
    renderLobbies();
  } catch (error) {
    els.cashierMessage.textContent = error.message;
  }
}

async function joinLobby(buyIn, size) {
  if (!currentUser) {
    showAuth("Log in or create an account before joining a lobby.");
    return;
  }

  if (startingPitchers.length < choicesPerRound) {
    els.cashierMessage.textContent = "At least 4 starting pitchers need to be loaded before joining a lobby.";
    return;
  }

  if (state.balance < buyIn) {
    els.cashierMessage.textContent = `You need ${money(buyIn - state.balance)} more to enter the ${money(buyIn)} lobby.`;
    return;
  }

  try {
    const payload = await apiRequest("/api/lobbies/join", {
      method: "POST",
      body: JSON.stringify({ buyIn, size })
    });
    currentUser = payload.user;
    state.balance = currentUser.balance;
    state.activeBuyIn = buyIn;
    state.lobby = payload.lobby;
    state.results = [];
    state.resultsSettled = false;
    state.roster = [];
    els.cashierMessage.textContent = `${money(buyIn)} ${size}-player lobby joined. Your seat is locked.`;
    await loadLobbySummaries();
    nextRound();
    renderAll();
    switchTab("draft");
  } catch (error) {
    els.cashierMessage.textContent = error.message;
  }
}

function nextSlot() {
  return rosterSlots[state.roster.length] || null;
}

function isInjured(player) {
  return injuredPlayers.has(player.name);
}

function eligibleForSlot(player, slot) {
  if (slot !== "SP" && isInjured(player)) return false;
  if (slot !== "SP" && player.opponent === "Off slate") return false;
  return player.positions.includes(slot);
}

function draftCardStats(player) {
  if (player.positions.includes("SP")) {
    return [
      ["Role", "Starter"],
      ["Team", player.team],
      ["Status", player.opponent || "Today"]
    ];
  }

  return [
    ["AVG", player.avg],
    ["OPS", player.ops],
    ["OPP SP", player.opponent]
  ];
}

function nextRound() {
  state.currentSlot = nextSlot();
  if (!state.currentSlot) {
    state.choices = [];
    return;
  }

  const alreadyDrafted = new Set(state.roster.map((pick) => pick.player.name));
  const pool = players.filter((player) => !alreadyDrafted.has(player.name) && eligibleForSlot(player, state.currentSlot));
  state.choices = pool.sort(() => Math.random() - 0.5).slice(0, choicesPerRound);
}

function choosePlayer(playerName) {
  const player = state.choices.find((choice) => choice.name === playerName);
  if (!player) return;

  state.roster.push({ slot: state.currentSlot, player });
  nextRound();

  if (state.roster.length === rosterSlots.length) {
    state.resultsSettled = false;
    state.results = [];
  }

  renderAll();

  if (state.roster.length === rosterSlots.length) {
    switchTab("results");
  }
}

function renderDraft() {
  els.activeBuyIn.textContent = state.activeBuyIn
    ? `${money(state.activeBuyIn)} / ${state.lobby?.size || 0} players`
    : "$0 lobby";
  els.pickCounter.textContent = `${state.roster.length} / ${rosterSlots.length}`;

  if (!state.activeBuyIn) {
    els.draftStatus.textContent = "Join a lobby to start";
    els.roundTitle.textContent = "Draft Room";
    els.choiceGrid.className = "choice-grid empty-state";
    els.choiceGrid.innerHTML = "<p>Select a lobby from the menu to generate your first eligible player choice.</p>";
    return;
  }

  if (state.roster.length === rosterSlots.length) {
    els.draftStatus.textContent = "Lineup submitted";
    els.roundTitle.textContent = "Waiting on the MLB slate";
    els.choiceGrid.className = "choice-grid empty-state";
    els.choiceGrid.innerHTML = "<p>Your entry is in the pool. Results will settle after the MLB slate finishes.</p>";
    return;
  }

  els.draftStatus.textContent = `Round ${state.roster.length + 1} of ${rosterSlots.length}`;
  els.roundTitle.textContent = `Choose ${state.currentSlot}`;
  els.choiceGrid.className = "choice-grid";
  els.choiceGrid.innerHTML = "";
  state.choices.forEach((player, index) => {
    const card = document.createElement("button");
    card.className = "player-card";
    card.style.setProperty("--card-delay", `${index * 85}ms`);
    const stats = draftCardStats(player);
    card.innerHTML = `
      <div class="player-card-top">
        <img class="player-photo" src="${baseballReferencePhotoUrl(player.name)}" alt="${escapeHtml(player.name)} headshot" loading="lazy">
        <div class="player-card-copy">
          <div class="player-name">${escapeHtml(player.name)}</div>
          <div class="player-team">${escapeHtml(player.team)} / ${escapeHtml(player.positions.join(", "))}</div>
        </div>
      </div>
      <div class="stat-strip">
        ${stats.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
      </div>
    `;
    card.querySelector(".player-photo").addEventListener("error", (event) => {
      event.currentTarget.hidden = true;
    });
    card.addEventListener("click", () => choosePlayer(player.name));
    els.choiceGrid.appendChild(card);
  });
}

function renderSlots() {
  const counts = {};
  els.slotList.innerHTML = "";
  rosterSlots.forEach((slot) => {
    const pick = state.roster.filter((item) => item.slot === slot)[counts[slot] || 0]?.player;
    counts[slot] = (counts[slot] || 0) + 1;
    const row = document.createElement("div");
    row.className = `slot ${pick ? "filled" : ""}`;
    row.innerHTML = `<span>${slot}</span><strong>${pick ? pick.name : "Open"}</strong>`;
    els.slotList.appendChild(row);
  });
}

function renderLineup() {
  if (!state.roster.length) {
    els.lineupList.className = "lineup-list empty-state";
    els.lineupList.innerHTML = "<p>Your submitted lineup will appear here.</p>";
  } else {
    els.lineupList.className = "lineup-list";
    els.lineupList.innerHTML = "";
    state.roster.forEach((pick) => {
      const row = document.createElement("div");
      row.className = "lineup-row";
      row.innerHTML = `<span>${pick.slot}</span><strong>${pick.player.name}</strong><span>${pick.player.team}</span>`;
      els.lineupList.appendChild(row);
    });
  }
}

function renderPayouts() {
  const buyIn = state.activeBuyIn || 10;
  const size = state.lobby?.size || 5;
  const payouts = payoutTable(buyIn, size);
  els.payoutList.innerHTML = "";
  payouts.forEach((amount, index) => {
    const row = document.createElement("div");
    row.className = "payout-row";
    row.innerHTML = `<span>${ordinal(index + 1)}</span><strong>${money(amount)}</strong>`;
    els.payoutList.appendChild(row);
  });
}

function ordinal(rank) {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = rank % 100;
  return `${rank}${suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]}`;
}

function payoutTable(buyIn, size) {
  if (size === 20) {
    return [buyIn * 6, buyIn * 4, buyIn * 3, buyIn * 2.2, buyIn * 1.6, buyIn * 1.2, buyIn];
  }

  if (size === 10) {
    return [buyIn * 5, buyIn * 2.5, buyIn * 1.2, buyIn];
  }

  return [buyIn * 3, buyIn * 1.7];
}

function payoutForRank(rank, buyIn, size) {
  const payouts = payoutTable(buyIn, size);
  return payouts[rank - 1] || 0;
}

async function settleResults() {
  if (!state.lobby || state.roster.length !== rosterSlots.length || state.resultsSettled) return;

  state.results = state.lobby.entries
    .map((entry) => ({
      ...entry,
      score: entry.isCurrentUser
        ? Math.round((68 + Math.random() * 34 + state.roster.length * 1.6) * 10) / 10
        : Math.round((62 + Math.random() * 48) * 10) / 10
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
      payout: payoutForRank(index + 1, state.activeBuyIn, state.lobby.size)
    }));

  const userResult = state.results.find((entry) => entry.isCurrentUser);
  if (userResult?.payout) {
    await addFunds(userResult.payout);
  }

  state.resultsSettled = true;
  renderAll();
}

function renderLobbyPlayers() {
  const entries = state.lobby?.entries || [];
  els.lobbySeatCount.textContent = state.lobby ? `${entries.length} / ${state.lobby.size}` : "0 / 0";

  if (!entries.length) {
    els.lobbyPlayers.className = "lineup-list empty-state";
    els.lobbyPlayers.innerHTML = "<p>No lobby selected yet.</p>";
    return;
  }

  els.lobbyPlayers.className = "lineup-list";
  els.lobbyPlayers.innerHTML = "";
  entries.forEach((entry, index) => {
    const row = document.createElement("div");
    row.className = `lineup-row ${entry.isCurrentUser ? "you" : ""}`;
    row.innerHTML = `<span>Seat ${index + 1}</span><strong>${escapeHtml(entry.name)}</strong><span>${entry.isCurrentUser ? "You" : "Ready"}</span>`;
    els.lobbyPlayers.appendChild(row);
  });
}

function renderResults() {
  renderLobbyPlayers();
  els.settleResults.disabled = !state.lobby || state.roster.length !== rosterSlots.length || state.resultsSettled;

  if (!state.lobby) {
    els.resultsStatus.textContent = "Waiting for entry";
    els.resultsList.className = "lineup-list empty-state";
    els.resultsList.innerHTML = "<p>Join a lobby and submit a lineup to wait for results.</p>";
    return;
  }

  if (state.roster.length !== rosterSlots.length) {
    els.resultsStatus.textContent = "Draft in progress";
    els.resultsList.className = "lineup-list empty-state";
    els.resultsList.innerHTML = "<p>Your lobby is seated. Finish drafting your lineup before results can settle.</p>";
    return;
  }

  if (!state.resultsSettled) {
    els.resultsStatus.textContent = "Waiting for results";
    els.resultsList.className = "lineup-list empty-state";
    els.resultsList.innerHTML = "<p>Your lineup is submitted. Final standings will appear after the slate is scored.</p>";
    return;
  }

  els.resultsStatus.textContent = "Payouts settled";
  els.resultsList.className = "lineup-list";
  els.resultsList.innerHTML = "";
  state.results.forEach((entry) => {
    const row = document.createElement("div");
    row.className = `lineup-row ${entry.isCurrentUser ? "you" : ""}`;
    row.innerHTML = `<span>#${entry.rank}</span><strong>${escapeHtml(entry.name)}</strong><span>${entry.score} pts / ${entry.payout ? money(entry.payout) : "$0.00"}</span>`;
    els.resultsList.appendChild(row);
  });
}

function renderAdminStarters() {
  els.starterTextarea.value = startingPitchers.map((player) => `${player.name}, ${player.team}`).join("\n");
  els.starterCount.textContent = `${startingPitchers.length} SP`;
  els.starterList.innerHTML = "";

  if (!startingPitchers.length) {
    els.starterList.className = "lineup-list empty-state";
    els.starterList.innerHTML = "<p>No starting pitchers entered yet.</p>";
    return;
  }

  els.starterList.className = "lineup-list";
  startingPitchers.forEach((player) => {
    const row = document.createElement("div");
    row.className = "lineup-row";
    row.innerHTML = `<span>SP</span><strong>${player.name}</strong><span>${player.team}</span>`;
    els.starterList.appendChild(row);
  });
}

function scoreBatter(formData) {
  return (
    Number(formData.get("totalBases") || 0) +
    Number(formData.get("rbi") || 0) +
    Number(formData.get("runs") || 0) +
    Number(formData.get("walksHbp") || 0) -
    Number(formData.get("batterStrikeouts") || 0)
  );
}

function scorePitcher(formData) {
  return (
    Number(formData.get("innings") || 0) +
    Number(formData.get("pitcherStrikeouts") || 0) -
    Number(formData.get("baserunners") || 0) -
    Number(formData.get("earnedRuns") || 0) * 2 +
    Number(formData.get("completeGame") || 0) * 5
  );
}

function startSession(user) {
  currentUser = user;
  state.balance = currentUser.balance;
  els.loginForm.reset();
  els.signupForm.reset();
  els.authMessage.textContent = "";
  renderAll();
  switchTab("lobbies");
}

async function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(els.loginForm);
  try {
    const payload = await apiRequest("/api/login", {
      method: "POST",
      body: JSON.stringify({
        identifier: String(formData.get("identifier")),
        password: String(formData.get("password"))
      })
    });
    startSession(payload.user);
    await loadLobbySummaries();
  } catch (error) {
    els.authMessage.textContent = error.message;
  }
}

async function handleSignup(event) {
  event.preventDefault();
  const formData = new FormData(els.signupForm);
  const username = String(formData.get("username")).trim();
  const email = String(formData.get("email")).trim().toLowerCase();
  const password = String(formData.get("password"));

  if (!username || !email || !password) {
    els.authMessage.textContent = "Username, email, and password are required.";
    return;
  }

  try {
    const payload = await apiRequest("/api/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password })
    });
    startSession(payload.user);
    await loadLobbySummaries();
  } catch (error) {
    els.authMessage.textContent = error.message;
  }
}

async function signOut() {
  try {
    await apiRequest("/api/logout", { method: "POST", body: JSON.stringify({}) });
  } catch {
    // The local UI should still clear if the server session is already gone.
  }
  currentUser = null;
  state.balance = 0;
  state.activeBuyIn = 0;
  state.lobby = null;
  state.results = [];
  state.resultsSettled = false;
  state.roster = [];
  state.currentSlot = null;
  state.choices = [];
  renderAll();
}

function renderAll() {
  renderAccount();
  refreshPlayers();
  updateBalance();
  renderLobbies();
  renderDraft();
  renderSlots();
  renderLineup();
  renderPayouts();
  renderResults();
  renderAdminStarters();
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

document.querySelectorAll("[data-deposit]").forEach((button) => {
  button.addEventListener("click", async () => {
    if (!currentUser) {
      showAuth("Log in before adding funds.");
      return;
    }

    const amount = Number(button.dataset.deposit);
    try {
      await addFunds(amount);
      els.cashierMessage.textContent = `${money(amount)} added to your account balance.`;
    } catch (error) {
      els.cashierMessage.textContent = error.message;
    }
  });
});

els.lobbySizeButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    state.selectedLobbySize = Number(button.dataset.lobbySize);
    renderLobbies();
    await loadLobbySummaries();
  });
});

els.loginForm.addEventListener("submit", handleLogin);
els.signupForm.addEventListener("submit", handleSignup);
els.signOutButton.addEventListener("click", signOut);
els.settleResults.addEventListener("click", settleResults);

els.saveStarters.addEventListener("click", () => {
  startingPitchers = parseStarters(els.starterTextarea.value);
  saveStoredStarters(startingPitchers);
  state.roster = [];
  if (state.activeBuyIn) nextRound();
  renderAll();
});

els.batterScoreForm.addEventListener("submit", (event) => {
  event.preventDefault();
  els.batterScoreResult.textContent = `${scoreBatter(new FormData(els.batterScoreForm))} pts`;
});

els.pitcherScoreForm.addEventListener("submit", (event) => {
  event.preventDefault();
  els.pitcherScoreResult.textContent = `${scorePitcher(new FormData(els.pitcherScoreForm))} pts`;
});

document.querySelector("#resetDraft").addEventListener("click", () => {
  state.roster = [];
  state.results = [];
  state.resultsSettled = false;
  if (state.activeBuyIn) nextRound();
  renderAll();
  switchTab("draft");
});

async function init() {
  try {
    const payload = await apiRequest("/api/session");
    if (payload.user) {
      currentUser = payload.user;
      state.balance = currentUser.balance;
      switchTab("lobbies");
    }
  } catch {
    // Running from file:// or without the server still shows the account screen.
  }

  renderAll();
  await loadLobbySummaries();
}

init();


