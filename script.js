// ===============================
// SUPABASE
// ===============================

const SUPABASE_URL = "https://octyeeameulsdlaqbc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jdHllZW9hbWV1bHNkbGFhcWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNDE3MzQsImV4cCI6MjEwMzYxNzczNH0.fctDZE-PaC0SPOmygd_6sDEGqaLguNlWXx757MHTPAI";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ===============================
// ELEMENTS
// ===============================

const gameList = document.getElementById("gameList");
const search = document.getElementById("search");
const count = document.getElementById("count");


// ===============================
// GAMES
// ===============================

let games = [];


// ===============================
// LOAD GAMES FROM SUPABASE
// ===============================

async function loadGames() {
  gameList.innerHTML = "<p>Loading games...</p>";

  const { data, error } = await supabaseClient
    .from("games")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    gameList.innerHTML =
      "<p>❌ Imeshindikana kupakia games.</p>";
    return;
  }

  games = data || [];

  showGames(games);
}


// ===============================
// SHOW GAMES
// ===============================

function showGames(list) {
  gameList.innerHTML = "";

  count.textContent =
    list.length + (list.length === 1 ? " game" : " games");

  if (list.length === 0) {
    gameList.innerHTML = "<p>Hakuna game iliyopatikana.</p>";
    return;
  }

  list.forEach(function(game) {

    const card = document.createElement("div");

    card.className = "game-card";

    const imageUrl =
      game.image_url ||
      game.image ||
      "";

    const downloadUrl =
      game.download_url ||
      game.url ||
      "#";

    card.innerHTML = `
      <div class="game-icon">
        ${
          imageUrl
            ? `<img src="${imageUrl}" alt="${game.name || "Game"}">`
            : `<div>🎮</div>`
        }
      </div>

      <h3>${game.name || "Game"}</h3>

      <p>🎮 Platform: ${game.platform || "Unknown"}</p>

      <p>📦 Size: ${game.size || "Unknown"}</p>

      <p>🗂️ Category: ${game.category || "Other"}</p>

      ${
        downloadUrl !== "#"
          ? `
            <a
              class="download-btn"
              href="${downloadUrl}"
              target="_blank"
              rel="noopener noreferrer">
              📥 DOWNLOAD
            </a>
          `
          : ""
      }
    `;

    gameList.appendChild(card);
  });
}


// ===============================
// CATEGORY FILTER
// ===============================

function filterCategory(category) {

  if (category === "All") {
    showGames(games);
    return;
  }

  const filtered = games.filter(function(game) {
    return game.category === category;
  });

  showGames(filtered);
}


// ===============================
// SEARCH
// ===============================

search.addEventListener("input", function() {

  const text = search.value.toLowerCase();

  const results = games.filter(function(game) {

    return (
      (game.name || "").toLowerCase().includes(text) ||
      (game.platform || "").toLowerCase().includes(text) ||
      (game.category || "").toLowerCase().includes(text)
    );

  });

  showGames(results);
});


// ===============================
// START
// ===============================

loadGames();
