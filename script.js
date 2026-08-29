const games=[
 {name:"Demo Football",platform:"Android",size:"1.2 GB",icon:"⚽",url:"#"},
 {name:"Demo Racing",platform:"PC",size:"2.8 GB",icon:"🏎️",url:"#"},
 {name:"Demo Adventure",platform:"Android",size:"950 MB",icon:"🗡️",url:"#"},
 {name:"Demo Action",platform:"PC",size:"4.1 GB",icon:"🔥",url:"#"}
];
const list=document.getElementById("gameList"),search=document.getElementById("search");
function render(q=""){
 list.innerHTML="";
 games.filter(g=>g.name.toLowerCase().includes(q.toLowerCase())).forEach(g=>{
  list.innerHTML+=`<article class="card"><div class="cover">${g.icon}</div><h3>${g.name}</h3><div class="meta">${g.platform} • ${g.size}</div><a class="download" href="${g.url}">📥 Download</a></article>`;
 });
}
search.addEventListener("input",e=>render(e.target.value));render();