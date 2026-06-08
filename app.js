const lobbyBuyIns = [0.5, 1, 5, 10, 20, 50, 100, 500];
const rosterSlots = ["C", "1B", "2B", "3B", "SS", "OF", "OF", "OF", "UTIL", "SP", "SP"];
const choicesPerRound = 4;
const storageKeys = {
  starters: "yourLineup.todayStarters"
};

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

let startingPitchers = loadStoredStarters();
let players = [...qualifiedHitters, ...startingPitchers];

const state = {
  balance: 42.5,
  activeBuyIn: 0,
  roster: [],
  currentSlot: null,
  choices: []
};

const els = {
  balance: document.querySelector("#balance"),
  lobbyGrid: document.querySelector("#lobbyGrid"),
  cashierMessage: document.querySelector("#cashierMessage"),
  choiceGrid: document.querySelector("#choiceGrid"),
  slotList: document.querySelector("#slotList"),
  lineupList: document.querySelector("#lineupList"),
  payoutList: document.querySelector("#payoutList"),
  rakeBadge: document.querySelector("#rakeBadge"),
  draftStatus: document.querySelector("#draftStatus"),
  roundTitle: document.querySelector("#roundTitle"),
  activeBuyIn: document.querySelector("#activeBuyIn"),
  pickCounter: document.querySelector("#pickCounter"),
  playerPoolStatus: document.querySelector("#playerPoolStatus"),
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

function loadStoredStarters() {
  const stored = readStorage(storageKeys.starters);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
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
    ? `${startingPitchers.length} admin SPs loaded`
    : "Admin SPs needed";
  els.playerPoolStatus.textContent = `${qualifiedHitters.length} qualified hitters / ${starterText}`;
}

function refreshPlayers() {
  players = [...qualifiedHitters, ...startingPitchers];
  setPlayerPoolStatus();
}

function switchTab(tabName) {
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

function renderLobbies() {
  els.lobbyGrid.innerHTML = "";
  lobbyBuyIns.forEach((buyIn) => {
    const button = document.createElement("button");
    button.className = "lobby-card";
    button.innerHTML = `
      <span class="eyebrow">10-player lobby</span>
      <strong>${money(buyIn)}</strong>
      <span class="lobby-meta"><span>Prize ${money(buyIn * 8.7)}</span><span>Rake ${money(buyIn * 0.3)}</span></span>
    `;
    button.addEventListener("click", () => joinLobby(buyIn));
    els.lobbyGrid.appendChild(button);
  });
}

function joinLobby(buyIn) {
  if (startingPitchers.length < choicesPerRound) {
    els.cashierMessage.textContent = "Enter at least 4 starting pitchers in Admin before joining a lobby.";
    switchTab("admin");
    return;
  }

  if (state.balance < buyIn) {
    els.cashierMessage.textContent = `You need ${money(buyIn - state.balance)} more to enter the ${money(buyIn)} lobby.`;
    return;
  }

  state.balance -= buyIn;
  state.activeBuyIn = buyIn;
  state.roster = [];
  els.cashierMessage.textContent = `${money(buyIn)} lobby joined. Your seat is locked.`;
  updateBalance();
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
  renderAll();

  if (state.roster.length === rosterSlots.length) {
    switchTab("lineup");
  }
}

function renderDraft() {
  els.activeBuyIn.textContent = state.activeBuyIn ? `${money(state.activeBuyIn)} lobby` : "$0 lobby";
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
    els.choiceGrid.innerHTML = "<p>Your entry is in the pool. Leaderboard scoring begins when real-life stats are posted.</p>";
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
  const payouts = [
    ["1st", buyIn * 5],
    ["2nd", buyIn * 2.5],
    ["3rd", buyIn * 1.2],
    ["4th", buyIn]
  ];
  els.rakeBadge.textContent = `Rake ${money(buyIn * 0.3)}`;
  els.payoutList.innerHTML = "";
  payouts.forEach(([place, amount]) => {
    const row = document.createElement("div");
    row.className = "payout-row";
    row.innerHTML = `<span>${place}</span><strong>${money(amount)}</strong>`;
    els.payoutList.appendChild(row);
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

function renderAll() {
  refreshPlayers();
  updateBalance();
  renderDraft();
  renderSlots();
  renderLineup();
  renderPayouts();
  renderAdminStarters();
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

document.querySelectorAll("[data-deposit]").forEach((button) => {
  button.addEventListener("click", () => {
    const amount = Number(button.dataset.deposit);
    state.balance += amount;
    els.cashierMessage.textContent = `${money(amount)} added to your prototype balance.`;
    updateBalance();
  });
});

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
  if (state.activeBuyIn) nextRound();
  renderAll();
  switchTab("draft");
});

renderLobbies();
renderAll();
