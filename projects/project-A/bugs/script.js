let img2 = "firefly2.png";
let body = document.getElementById("body");
//let caught = false;
// let wins = [];

let catchThem;

function mailbox(firefly){
  catchThem = firefly;
}

window.addEventListener("click", ()=>{
  catchThem();
  window.close();
  //caught = true;
  //win2.document.getElementById("bottle").appendChild(img);
  // ranX+=0;
  // ranY+=0;
})

// setTimeout(()=>{
//   window.close();
// },5000)
