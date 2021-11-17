console.log("hi");

let socket = io();
let button = document.getElementById("generate");
let emoji1 = document.getElementById("emoji1");
let emoji2 = document.getElementById("emoji2");
let emoji3 = document.getElementById("emoji3");
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
  if (emo == "🔥"){
    emoji3.appendChild(p);
  }
}

socket.on("usernumber", (usernumber)=>{
  // pushEmoji();
  num = usernumber.length;
  if (num == 1) {
    pushEmoji("😮");
    emoji2.innerHTML = "";
    emoji3.innerHTML = "";
    body.style.backgroundColor = "blue";
    // let click1 = emoji1.childElementCount;
    // socket.emit('emoji1', click1);
  }
  if (num == 2) {
    pushEmoji("💖");
    emoji1.innerHTML = "";
    emoji3.innerHTML = "";
    body.style.backgroundColor = "pink";
    // let click2 = emoji2.childElementCount;
    // socket.emit('emoji2', click2);
  }
  if (num == 3) {
    pushEmoji("🔥");
    emoji1.innerHTML = "";
    emoji2.innerHTML = "";
    body.style.backgroundColor = "red";
    // let click3 = emoji3.childElementCount;
    // socket.emit('emoji3', click3);
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
// let namebox = document.getElementById("name");
// let chatbox = document.getElementById("chat");
// let messagebox = document.getElementById("message");
// let sendbutton = document.getElementById("send");

// sendbutton.addEventListener("click", ()=>{
//   console.log("clicked");
//   let name = namebox.value.trim();
//   if(name == ""){
//     name = "anonymous";
//     namebox.value = ""
//   }
//   let message = messagebox.value.trim();
//   if(message != ""){
//     let data = {name: name, message: message};
//     socket.emit('message', data);
//     console.log(data);
//   }
//   messagebox.value = "";
// })
//
// socket.on("incoming", (data)=>{
//   console.log(data);
//   let name = data.name;
//   let message = data.message;
//   let li = document.createElement("li");
//   let p = document.createElement("p");
//   p.innerHTML = "<span class='sender'>"+name+":</span>"+message
//   li.appendChild(p);
//   chatbox.appendChild(li);
//   chatbox.scrollTop = chatbox.scrollHeight;
// })
//
// messagebox.addEventListener("keyup", function(event){
//   if (event.keyCode === 13){
//     sendbutton.click();
//   }
// })
