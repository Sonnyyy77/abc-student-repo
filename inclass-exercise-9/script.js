let socket = io("https://mellow-blossom-chasmosaurus.glitch.me");
let others = [];
let myId;
let testMode = false;

//receiveMyId
socket.on('singleId', function(msg) {
  console.log("My ID:", msg.value)
  myId = msg.value
});
// here I receive updated whenever someone disconnects or connects to the socket server.
socket.on('updatedClients', function(msg) {
  console.log("updatedClients", msg)
  others = msg.value
});

//-------------------

let all = document.getElementById("all");
let allbutme = document.getElementById("allbutme");
let randomSingle = document.getElementById("randomSingle");
let buttonOutput = document.getElementById("buttonOutput");

function buttonReceived(){
  buttonOutput.style.backgroundColor = "red";
  setTimeout(function(){
    buttonOutput.style.backgroundColor = "blue";
  }, 500)
  let emoji = document.createElement("p");
  let textnode=document.createTextNode("😮");
  emoji.appendChild(textnode);
  document.getElementById("").appendChild(emoji);
}

all.addEventListener("click", function(){
  console.log("click");
  socket.emit('button1ToAll');
})

socket.on('button1', function(msg){
  if(testMode && msg.from != myId){return}
  // console.log(msg)
  buttonReceived();
})

allbutme.addEventListener("click", function(){
  console.log("clicked");
  socket.emit('button1ToAllButMe');
})

randomSingle.addEventListener("click", function(){
  // console.log("clicked");
  // socket.emit('button1ToAllButMe');
  if(others.length>0){
    let ranFloat = Math.random()*others.length;
    let ranIdx = Math.floor(ranFloat);
    let randomOtherId = others[ranIdx];
    socket.emit('button1ToSingle', {id: randomOtherId});
  }
})
