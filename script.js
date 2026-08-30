const games = [
  {
    name: "PES 2025 NBC PL V2",
    platform: "Android",
    size: "ZIP",
    cat: "Football",
    icon: "⚽",
    url: "https://www.mediafire.com/file/piakyxymvyv1723/PES2025_NBC_PL_V2_BY_MASTER_PES.zip/file"
  }
];

const gameList = document.getElementById("gameList");
const search = document.getElementById("search");
const cats = document.getElementById("cats");

function showGames(list) {
  if (!gameList) return;

  gameList.innerHTML = "";

  if (list.length === 0) {
    gameList.innerHTML = "<p>Hakuna game iliyopatikana.</p>";
    return;
  }

  list.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <div class="game-icon">${game.icon}</div>
      <h3>${game.name}</h3>
      <p>🎮 Platform: ${game.platform}</p>
      <p>📦 Size: ${game.size}</p>
      <p>🗂️ Category: ${game.cat}</p>

      <a class="download-btn"
         href="${game.url}"
         target="_blank"
         rel="noopener noreferrer">
         📥 DOWNLOAD
      </a>
    `;

    gameList.appendChild(card);
  });
}

function showCategories() {
  if (!cats) return;

  const categories = ["All", ...new Set(games.map(game => game.cat))];

  cats.innerHTML = categories.map(category => `
    <button onclick="filterCategory('${category}')">
      ${category}
    </button>
  `).join("");
}

function filterCategory(category) {
  if (category === "All") {
    showGames(games);
  } else {
    showGames(games.filter(game => game.cat === category));
  }
}

if (search) {
  search.addEventListener("input", function () {
    const text = search.value.toLowerCase();

    const results = games.filter(game =>
      game.name.toLowerCase().includes(text) ||
      game.platform.toLowerCase().includes(text) ||
      game.cat.toLowerCase().includes(text)
    );

    showGames(results);
  });
}

showCategories();
showGames(games);
