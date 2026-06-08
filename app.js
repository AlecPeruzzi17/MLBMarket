const lobbyBuyIns = [0.5, 1, 5, 10, 20, 50, 100, 500];
const rosterSlots = ["C", "1B", "2B", "3B", "SS", "OF", "OF", "OF", "UTIL", "SP", "SP"];
const choicesPerRound = 4;
const storageKeys = {
  starters: "yourLineup.todayStarters",
  users: "yourLineup.users",
  session: "yourLineup.sessionEmail"
};
const lobbySizes = [5, 10, 20];
const housePlayers = [
  "Maya Chen",
  "Jordan Blake",
  "Sam Rivera",
  "Tessa Morgan",
  "Miles Carter",
  "Riley Brooks",
  "Nico Walsh",
  "Avery Stone",
  "Devin Ortiz",
  "Cameron Lee",
  "Quinn Foster",
  "Parker James",
  "Alex Reed",
  "Casey Young",
  "Drew Bennett",
  "Jamie Ford",
  "Kendall Hayes",
  "Morgan Price",
  "Reese Cole",
  "Taylor Grant",
  "Skyler Quinn",
  "Rowan Pierce",
  "Hayden Scott",
  "Blake Turner"
];
const defaultStartingPitchers = [
  { name: "Emerson Hancock", team: "SEA", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Trey Gibson", team: "BAL", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Connelly Early", team: "BOS", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Ian Seymour", team: "TB", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Will Warren", team: "NYY", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Gavin Williams", team: "CLE", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Cristopher Sanchez", team: "PHI", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Patrick Corbin", team: "TOR", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Spencer Arrighetti", team: "HOU", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Grayson Rodriguez", team: "LAA", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Andrew Abbott", team: "CIN", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Walker Buehler", team: "SD", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Richard Lovelady", team: "WSH", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Logan Webb", team: "SF", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Kyle Harrison", team: "MIL", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" },
  { name: "Jeffrey Springs", team: "ATH", positions: ["SP"], avg: "Probable", power: "Starter", trend: "Today" }
];

const qualifiedHitterRows = `
Adley Rutschman|BAL|C|.276|22 HR|3.1 PA/G
William Contreras|MIL|C|.281|23 HR|3.1 PA/G
Will Smith|LAD|C|.263|19 HR|3.1 PA/G
Cal Raleigh|SEA|C|.244|31 HR|3.1 PA/G
Salvador Perez|KC|C,1B|.271|27 HR|3.1 PA/G
Yainer Diaz|HOU|C|.299|16 HR|3.1 PA/G
J.T. Realmuto|PHI|C|.266|14 HR|3.1 PA/G
Sean Murphy|ATL|C|.251|21 HR|3.1 PA/G
Freddie Freeman|LAD|1B|.301|91 RBI|3.1 PA/G
Bryce Harper|PHI|1B,OF|.286|30 HR|3.1 PA/G
Vladimir Guerrero Jr.|TOR|1B|.283|26 HR|3.1 PA/G
Pete Alonso|NYM|1B|.240|34 HR|3.1 PA/G
Matt Olson|ATL|1B|.247|29 HR|3.1 PA/G
Christian Walker|HOU|1B|.251|26 HR|3.1 PA/G
Josh Naylor|ARI|1B|.284|31 HR|3.1 PA/G
Nathaniel Lowe|WSH|1B|.265|16 HR|3.1 PA/G
Spencer Torkelson|DET|1B|.233|25 HR|3.1 PA/G
Triston Casas|BOS|1B|.263|24 HR|3.1 PA/G
Michael Busch|CHC|1B|.248|21 HR|3.1 PA/G
Yandy Diaz|TB|1B,UTIL|.281|OBP|3.1 PA/G
Marcus Semien|TEX|2B|.255|83 R|3.1 PA/G
Jose Altuve|HOU|2B|.295|21 HR|3.1 PA/G
Mookie Betts|LAD|2B,SS,OF|.289|105 R|3.1 PA/G
Ketel Marte|ARI|2B|.292|36 HR|3.1 PA/G
Luis Arraez|SD|2B,1B|.314|Contact|3.1 PA/G
Ozzie Albies|ATL|2B|.251|10 SB|3.1 PA/G
Andres Gimenez|TOR|2B|.252|30 SB|3.1 PA/G
Brice Turang|MIL|2B,SS|.254|50 SB|3.1 PA/G
Nico Hoerner|CHC|2B,SS|.273|31 SB|3.1 PA/G
Gleyber Torres|DET|2B|.257|15 HR|3.1 PA/G
Jonathan India|KC|2B|.248|OBP|3.1 PA/G
Brendan Donovan|STL|2B,OF|.278|Multi-pos|3.1 PA/G
Jose Ramirez|CLE|3B|.279|34 SB|3.1 PA/G
Austin Riley|ATL|3B|.268|33 HR|3.1 PA/G
Manny Machado|SD|3B|.275|92 RBI|3.1 PA/G
Rafael Devers|BOS|3B|.272|28 HR|3.1 PA/G
Alex Bregman|BOS|3B|.260|26 HR|3.1 PA/G
Matt Chapman|SF|3B|.247|27 HR|3.1 PA/G
Nolan Arenado|STL|3B,UTIL|.272|71 RBI|3.1 PA/G
Eugenio Suarez|ARI|3B|.256|30 HR|3.1 PA/G
Isaac Paredes|HOU|3B,1B|.238|26 HR|3.1 PA/G
Alec Bohm|PHI|3B,1B|.280|97 RBI|3.1 PA/G
Max Muncy|LAD|3B,1B|.232|36 HR|3.1 PA/G
Bobby Witt Jr.|KC|SS|.304|30/30|3.1 PA/G
Francisco Lindor|NYM|SS|.273|29 HR|3.1 PA/G
Gunnar Henderson|BAL|SS,3B|.281|37 HR|3.1 PA/G
Trea Turner|PHI|SS|.295|19 SB|3.1 PA/G
Corey Seager|TEX|SS|.278|30 HR|3.1 PA/G
Elly De La Cruz|CIN|SS|.259|67 SB|3.1 PA/G
Willy Adames|SF|SS|.251|32 HR|3.1 PA/G
Dansby Swanson|CHC|SS|.244|16 HR|3.1 PA/G
Xander Bogaerts|SD|SS,2B|.264|Multi-pos|3.1 PA/G
Jeremy Pena|HOU|SS|.266|20 SB|3.1 PA/G
CJ Abrams|WSH|SS|.246|31 SB|3.1 PA/G
Bo Bichette|TOR|SS|.278|Hits|3.1 PA/G
Oneil Cruz|PIT|SS,OF|.259|40 SB|3.1 PA/G
Aaron Judge|NYY|OF|.294|50 HR|3.1 PA/G
Juan Soto|NYM|OF|.288|132 BB|3.1 PA/G
Julio Rodriguez|SEA|OF|.273|30 SB|3.1 PA/G
Corbin Carroll|ARI|OF|.268|40 SB|3.1 PA/G
Kyle Tucker|CHC|OF|.289|29 HR|3.1 PA/G
Yordan Alvarez|HOU|OF,UTIL|.295|35 HR|3.1 PA/G
Fernando Tatis Jr.|SD|OF|.276|25 HR|3.1 PA/G
Jackson Merrill|SD|OF|.292|24 HR|3.1 PA/G
Jarren Duran|BOS|OF|.285|34 SB|3.1 PA/G
Steven Kwan|CLE|OF|.292|OBP|3.1 PA/G
Teoscar Hernandez|LAD|OF|.272|33 HR|3.1 PA/G
Brent Rooker|ATH|OF,UTIL|.293|39 HR|3.1 PA/G
Riley Greene|DET|OF|.262|24 HR|3.1 PA/G
Lawrence Butler|ATH|OF|.262|20/20|3.1 PA/G
Byron Buxton|MIN|OF|.275|Power|3.1 PA/G
Mike Trout|LAA|OF|.263|Power|3.1 PA/G
Ronald Acuna Jr.|ATL|OF|.300|Speed|3.1 PA/G
Michael Harris II|ATL|OF|.264|20 SB|3.1 PA/G
Ian Happ|CHC|OF|.243|25 HR|3.1 PA/G
Seiya Suzuki|CHC|OF,UTIL|.283|21 HR|3.1 PA/G
Pete Crow-Armstrong|CHC|OF|.240|30 SB|3.1 PA/G
Luis Robert Jr.|CWS|OF|.248|30 HR|3.1 PA/G
Andrew Benintendi|CWS|OF|.245|Contact|3.1 PA/G
TJ Friedl|CIN|OF|.269|Speed|3.1 PA/G
Spencer Steer|CIN|OF,1B,3B|.242|20 HR|3.1 PA/G
Lane Thomas|CLE|OF|.246|20 SB|3.1 PA/G
Nolan Jones|COL|OF|.263|Power|3.1 PA/G
Brenton Doyle|COL|OF|.260|30 SB|3.1 PA/G
Kerry Carpenter|DET|OF|.284|Power|3.1 PA/G
Kyle Stowers|MIA|OF|.250|Power|3.1 PA/G
Jesus Sanchez|MIA|OF|.253|Power|3.1 PA/G
Christian Yelich|MIL|OF,UTIL|.285|OBP|3.1 PA/G
Jackson Chourio|MIL|OF|.275|20/20|3.1 PA/G
Trevor Larnach|MIN|OF|.250|Power|3.1 PA/G
Brandon Nimmo|NYM|OF|.270|OBP|3.1 PA/G
Cody Bellinger|NYY|OF,1B|.266|20 HR|3.1 PA/G
Jasson Dominguez|NYY|OF|.250|Speed|3.1 PA/G
Bryan Reynolds|PIT|OF|.275|24 HR|3.1 PA/G
Randy Arozarena|SEA|OF|.250|20/20|3.1 PA/G
Victor Robles|SEA|OF|.265|Speed|3.1 PA/G
Heliot Ramos|SF|OF|.269|22 HR|3.1 PA/G
Lars Nootbaar|STL|OF|.244|OBP|3.1 PA/G
Jordan Walker|STL|OF|.252|Power|3.1 PA/G
Josh Lowe|TB|OF|.265|Speed|3.1 PA/G
George Springer|TOR|OF|.257|20 HR|3.1 PA/G
Daulton Varsho|TOR|OF|.238|Power|3.1 PA/G
James Wood|WSH|OF|.264|Power|3.1 PA/G
Dylan Crews|WSH|OF|.246|Speed|3.1 PA/G
Shohei Ohtani|LAD|UTIL|.310|54 HR|3.1 PA/G
Marcell Ozuna|ATL|UTIL,OF|.302|39 HR|3.1 PA/G
Kyle Schwarber|PHI|UTIL,OF|.248|38 HR|3.1 PA/G
Ryan O'Hearn|BAL|UTIL,1B,OF|.275|Platoon|3.1 PA/G
Masataka Yoshida|BOS|UTIL,OF|.270|Contact|3.1 PA/G
Jorge Soler|LAA|UTIL,OF|.235|Power|3.1 PA/G
Giancarlo Stanton|NYY|UTIL,OF|.240|Power|3.1 PA/G
J.D. Martinez|FA|UTIL|.255|Power|3.1 PA/G
Harold Ramirez|FA|UTIL,OF|.280|Contact|3.1 PA/G
`.trim();

const qualifiedHitters = qualifiedHitterRows.split("\n").map((row) => {
  const [name, team, positions, avg, power, trend] = row.split("|");
  return { name, team, positions: positions.split(","), avg, power, trend };
});

let users = loadUsers();
let currentUser = loadCurrentUser();
let startingPitchers = loadStoredStarters();
let players = [...qualifiedHitters, ...startingPitchers];

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
    // Storage is optional in this static prototype.
  }
}

function loadUsers() {
  const stored = readStorage(storageKeys.users);
  if (!stored) return [];
  try {
    return JSON.parse(stored).map((user) => ({
      username: user.username || user.name || user.email,
      email: user.email,
      password: user.password,
      balance: Number(user.balance ?? 42.5)
    }));
  } catch {
    return [];
  }
}

function saveUsers() {
  writeStorage(storageKeys.users, JSON.stringify(users));
}

function loadCurrentUser() {
  const email = readStorage(storageKeys.session);
  if (!email) return null;
  return loadUsers().find((user) => user.email === email) || null;
}

function saveCurrentUser() {
  if (!currentUser) return;
  users = users.map((user) => (user.email === currentUser.email ? currentUser : user));
  saveUsers();
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
        avg: "Admin",
        power: "Starter",
        trend: "Today"
      };
    })
    .filter((player) => player.name);
}

function setPlayerPoolStatus() {
  const starterText = startingPitchers.length
    ? `${startingPitchers.length} projected SPs loaded`
    : "SP pool pending";
  els.playerPoolStatus.textContent = `${qualifiedHitters.length} qualified hitters / ${starterText}`;
}

function refreshPlayers() {
  players = [...qualifiedHitters, ...startingPitchers];
  setPlayerPoolStatus();
}

function syncUserBalance() {
  if (!currentUser) return;
  currentUser.balance = state.balance;
  saveCurrentUser();
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
    const button = document.createElement("button");
    button.className = "lobby-card";
    const filledSeats = state.lobby?.buyIn === buyIn && state.lobby?.size === size
      ? state.lobby.entries.length
      : Math.min(size - 1, Math.max(2, Math.floor(size * 0.45) + Math.floor(buyIn) % 4));
    button.innerHTML = `
      <span class="eyebrow">${size}-player lobby</span>
      <strong>${money(buyIn)}</strong>
      <span class="lobby-meta"><span>${filledSeats} / ${size} seated</span></span>
    `;
    button.addEventListener("click", () => joinLobby(buyIn, size));
    els.lobbyGrid.appendChild(button);
  });
}

function buildLobby(buyIn, size) {
  const opponents = housePlayers
    .filter((name) => name !== currentUser.username)
    .sort(() => Math.random() - 0.5)
    .slice(0, size - 1)
    .map((name, index) => ({
      id: `house-${index}`,
      name,
      score: 0,
      payout: 0,
      isCurrentUser: false
    }));

  return {
    buyIn,
    size,
    entries: [
      {
        id: currentUser.email,
        name: currentUser.username,
        score: 0,
        payout: 0,
        isCurrentUser: true
      },
      ...opponents
    ]
  };
}

function joinLobby(buyIn, size) {
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

  state.balance -= buyIn;
  state.activeBuyIn = buyIn;
  state.lobby = buildLobby(buyIn, size);
  state.results = [];
  state.resultsSettled = false;
  state.roster = [];
  els.cashierMessage.textContent = `${money(buyIn)} ${size}-player lobby joined. Your seat is locked.`;
  updateBalance();
  syncUserBalance();
  nextRound();
  renderAll();
  switchTab("draft");
}

function nextSlot() {
  const filledCounts = state.roster.reduce((counts, pick) => {
    counts[pick.slot] = (counts[pick.slot] || 0) + 1;
    return counts;
  }, {});

  if (state.roster.length >= rosterSlots.length) return null;
  if (state.roster.length >= 9) return "SP";

  const openHitters = ["C", "1B", "2B", "3B", "SS", "OF", "UTIL"].filter((slot) => {
    const max = slot === "OF" ? 3 : 1;
    return (filledCounts[slot] || 0) < max;
  });
  return openHitters[Math.floor(Math.random() * openHitters.length)];
}

function eligibleForSlot(player, slot) {
  if (slot === "UTIL") return !player.positions.includes("SP");
  return player.positions.includes(slot);
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
    els.choiceGrid.innerHTML = "<p>Select a lobby from the menu to generate your first four-player choice.</p>";
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
    card.innerHTML = `
      <div>
        <div class="player-name">${player.name}</div>
        <div class="player-team">${player.team} / ${player.positions.join(", ")}</div>
      </div>
      <div class="stat-strip">
        <div><span>Form</span><strong>${player.avg}</strong></div>
        <div><span>Edge</span><strong>${player.power}</strong></div>
        <div><span>Status</span><strong>${player.trend}</strong></div>
      </div>
    `;
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

function settleResults() {
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
    state.balance += userResult.payout;
    syncUserBalance();
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

function authenticate(identifier, password) {
  const normalized = identifier.trim().toLowerCase();
  return users.find((user) => (
    (user.email.toLowerCase() === normalized || user.username.toLowerCase() === normalized) &&
    user.password === password
  )) || null;
}

function startSession(user) {
  currentUser = user;
  state.balance = currentUser.balance;
  writeStorage(storageKeys.session, currentUser.email);
  els.loginForm.reset();
  els.signupForm.reset();
  els.authMessage.textContent = "";
  renderAll();
  switchTab("lobbies");
}

function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(els.loginForm);
  const user = authenticate(String(formData.get("identifier")), String(formData.get("password")));

  if (!user) {
    els.authMessage.textContent = "No account matched those credentials.";
    return;
  }

  startSession(user);
}

function handleSignup(event) {
  event.preventDefault();
  const formData = new FormData(els.signupForm);
  const username = String(formData.get("username")).trim();
  const email = String(formData.get("email")).trim().toLowerCase();
  const password = String(formData.get("password"));

  if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
    els.authMessage.textContent = "That username is taken. Try another one.";
    return;
  }

  if (users.some((user) => user.email === email)) {
    els.authMessage.textContent = "That email already has an account. Log in instead.";
    return;
  }

  const user = {
    username,
    email,
    password,
    balance: 42.5
  };

  users.push(user);
  saveUsers();
  startSession(user);
}

function signOut() {
  currentUser = null;
  state.balance = 0;
  state.activeBuyIn = 0;
  state.lobby = null;
  state.results = [];
  state.resultsSettled = false;
  state.roster = [];
  state.currentSlot = null;
  state.choices = [];
  removeStorage(storageKeys.session);
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
  button.addEventListener("click", () => {
    if (!currentUser) {
      showAuth("Log in before adding funds.");
      return;
    }

    const amount = Number(button.dataset.deposit);
    state.balance += amount;
    els.cashierMessage.textContent = `${money(amount)} added to your prototype balance.`;
    updateBalance();
    syncUserBalance();
  });
});

els.lobbySizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.selectedLobbySize = Number(button.dataset.lobbySize);
    renderLobbies();
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

renderAll();
if (currentUser) switchTab("lobbies");
