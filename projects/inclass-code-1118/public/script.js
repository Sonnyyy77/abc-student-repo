let socket = io();
let myPeerID;
// let peer = new Peer();

function getMouseImage(){
  let img = document.createElement("img");
  img.src = "mouse.png";
  img.className = "mouse";
  document.body.appendChild(img);
  return img;
}

let myMouse = getMouseImage();
document.addEventListener("mouseover", function(iMoveMouse){
  console.log(iMoveMouse);
  myMouse.style.left = iMovedMouse.clientX - 20 + "px";
  myMouse.style.top = iMovedMouse.clientY - 10 +"px";
})

socket.on("welcomeToAT&T", function(welcomePack){
  console.log("got a welcome pack from AT&T");
  console.log(welcomePack);

  myPeerID = welcomePack.yourPeerID;
  let peer = new Peer(myPeerID);

  peer.on('open', function(id){
    // console.log("my peer ID is:" + id);
    console.log("Technician: done");
    console.log("who to call?");
    for (let i=0;i<welcomePack.pleaseCall.length;i++){
      let callThisNumber = welcomePack.pleaseCall[i].peerID;
      if(callThisNumber!=myPeerID){
        console.log("calling", callThisNumber);
        let conn=peer.connect(callThisNumber);
      }
    }
  })
});

peer.on('connection', function(conn){
  console.log("i am being connected");
})

// peer.on('open', function(id){
//   console.log("my peer ID is:" + id);
// })
