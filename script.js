const games = [
  {
    name: "PES 2025 NBC PL V2",
    platform: "Android",
    size: "ZIP",
    cat: "Football",
    icon: image: "WEKA_LINK_YA_PICHA_HAPA",
    url: "https://www.mediafire.com/file/piakyxymvyv1723/PES2025_NBC_PL_V2_BY_MASTER_PES.zip/file"
  },

  {
    name: "PES 2021 Mobile UCL MOD OFFLINE",
    platform: "Android",
    size: "1.62 GB",
    cat: "Football",
    icon: image: "WEKA_LINK_YA_PICHA_HAPA",
    url: "https://modsfire.com/download/8n21dAo36O351Q3/68715"
  }
];

const gameList = document.getElementById("gameList");
const search = document.getElementById("search");
const count = document.getElementById("count");

function showGames(list) {
  gameList.innerHTML = "";

  count.textContent =
    list.length + (list.length === 1 ? " game" : " games");

  list.forEach(function(game) {

    const card = document.createElement("div");

    card.className = "game-card";

    card.innerHTML = `
      <div class="game-icon">
  <img src="${game.image}" alt="${game.name}">
</div>

      <h3>${game.name}</h3>

      <p>🎮 Platform: ${game.platform}</p>

      <p>📦 Size: ${game.size}</p>

      <p>🗂️ Category: ${game.cat}</p>

      <a
        class="download-btn"
        href="${game.url}"
        target="_blank"
        rel="noopener noreferrer">
        📥 DOWNLOAD
      </a>
    `;

    gameList.appendChild(card);
  });
}

function filterCategory(category) {

  if (category === "All") {
    showGames(games);
  } else {

    const filtered = games.filter(function(game) {
      return game.cat === category;
    });

    showGames(filtered);
  }
}

search.addEventListener("input", function() {

  const text = search.value.toLowerCase();

  const results = games.filter(function(game) {

    return (
      game.name.toLowerCase().includes(text) ||
      game.platform.toLowerCase().includes(text) ||
      game.cat.toLowerCase().includes(text)
    );

  });

  showGames(results);
});

showGames(games);
