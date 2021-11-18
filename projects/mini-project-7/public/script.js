console.log("hi");

let socket = io();
let button = document.getElementById("generate");
let emoji1 = document.getElementById("emoji1");
let emoji2 = document.getElementById("emoji2");
let emoji3 = document.getElementById("emoji3");
let emoji4 = document.getElementById("emoji4");
let emoji5 = document.getElementById("emoji5");
let emoji6 = document.getElementById("emoji6");
let emoji7 = document.getElementById("emoji7");
let emoji8 = document.getElementById("emoji8");
let emoji9 = document.getElementById("emoji9");
let body = document.getElementById("body");
let num;

button.addEventListener("click", ()=>{
  console.log("clicked");
  socket.emit('number', num);
})

function pushEmoji(emo){
  let p = document.createElement("p");
  p.innerHTML = "<span class='sender'>"+emo+"</span";
  p.style.position = "absolute";
  p.style.left = Math.random() * window.innerWidth + "px";
  p.style.top = Math.random() * window.innerHeight + "px";
  p.style.fontSize = "50px";
  p.style.zIndex = "100";
  if (emo == "😮"){
    emoji1.appendChild(p);
  }
  if (emo == "💖"){
    emoji2.appendChild(p);
  }
  if (emo == "💍"){
    emoji3.appendChild(p);
  }
  if (emo == "🍼"){
    emoji4.appendChild(p);
  }
  if (emo == "🪁"){
    emoji5.appendChild(p);
  }
  if (emo == "🎒"){
    emoji6.appendChild(p);
  }
  if (emo == "🎓"){
    emoji7.appendChild(p);
  }
  if (emo == "🚑"){
    emoji8.appendChild(p);
  }
  if (emo == "⚰️"){
    emoji9.appendChild(p);
  }
}

socket.on("usernumber", (usernumber)=>{
  // pushEmoji();
  num = usernumber.length;
  if (num == 1) {
    pushEmoji("😮");
    emoji2.innerHTML = "";
    emoji3.innerHTML = "";
    emoji4.innerHTML = "";
    emoji5.innerHTML = "";
    emoji6.innerHTML = "";
    emoji7.innerHTML = "";
    emoji8.innerHTML = "";
    emoji9.innerHTML = "";
    body.style.backgroundColor = "silver";
  }
  if (num == 2) {
    pushEmoji("💖");
    emoji1.innerHTML = "";
    emoji3.innerHTML = "";
    emoji4.innerHTML = "";
    emoji5.innerHTML = "";
    emoji6.innerHTML = "";
    emoji7.innerHTML = "";
    emoji8.innerHTML = "";
    emoji9.innerHTML = "";
    body.style.backgroundColor = "pink";
  }
  if (num == 3) {
    pushEmoji("💍");
    emoji1.innerHTML = "";
    emoji2.innerHTML = "";
    emoji4.innerHTML = "";
    emoji5.innerHTML = "";
    emoji6.innerHTML = "";
    emoji7.innerHTML = "";
    emoji8.innerHTML = "";
    emoji9.innerHTML = "";
    body.style.backgroundColor = "yellow";
  }
  if (num == 4) {
    pushEmoji("🍼");
    emoji1.innerHTML = "";
    emoji2.innerHTML = "";
    emoji3.innerHTML = "";
    emoji5.innerHTML = "";
    emoji6.innerHTML = "";
    emoji7.innerHTML = "";
    emoji8.innerHTML = "";
    emoji9.innerHTML = "";
    body.style.backgroundColor = "mistyrose";
  }
  if (num == 5) {
    pushEmoji("🪁");
    emoji1.innerHTML = "";
    emoji2.innerHTML = "";
    emoji3.innerHTML = "";
    emoji4.innerHTML = "";
    emoji6.innerHTML = "";
    emoji7.innerHTML = "";
    emoji8.innerHTML = "";
    emoji9.innerHTML = "";
    body.style.backgroundColor = "aqua";
  }
  if (num == 6) {
    pushEmoji("🎒");
    emoji1.innerHTML = "";
    emoji2.innerHTML = "";
    emoji3.innerHTML = "";
    emoji4.innerHTML = "";
    emoji5.innerHTML = "";
    emoji7.innerHTML = "";
    emoji8.innerHTML = "";
    emoji9.innerHTML = "";
    body.style.backgroundColor = "lime";
  }
  if (num == 7) {
    pushEmoji("🎓");
    emoji1.innerHTML = "";
    emoji2.innerHTML = "";
    emoji3.innerHTML = "";
    emoji4.innerHTML = "";
    emoji5.innerHTML = "";
    emoji6.innerHTML = "";
    emoji8.innerHTML = "";
    emoji9.innerHTML = "";
    body.style.backgroundColor = "blueviolet";
  }
  if (num == 8) {
    pushEmoji("🚑");
    emoji1.innerHTML = "";
    emoji2.innerHTML = "";
    emoji3.innerHTML = "";
    emoji4.innerHTML = "";
    emoji5.innerHTML = "";
    emoji6.innerHTML = "";
    emoji7.innerHTML = "";
    emoji9.innerHTML = "";
    body.style.backgroundColor = "red";
  }
  if (num >= 9) {
    pushEmoji("⚰️");
    emoji1.innerHTML = "";
    emoji2.innerHTML = "";
    emoji3.innerHTML = "";
    emoji4.innerHTML = "";
    emoji5.innerHTML = "";
    emoji6.innerHTML = "";
    emoji7.innerHTML = "";
    emoji8.innerHTML = "";
    body.style.backgroundColor = "saddlebrown";
  }
})
/*
socket.on("emoji1", (click1)=>{
  for (let i = 0; i < click1; i++){
    pushEmoji("😮");
  }
})

socket.on("emoji2", (click2)=>{
  for (let i = 0; i < click2; i++){
    pushEmoji("💖");
  }
})

socket.on("emoji3", (click3)=>{
  for (let i = 0; i < click3; i++){
    pushEmoji("🔥");
  }
})
*/
