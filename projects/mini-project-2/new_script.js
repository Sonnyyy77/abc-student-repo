let button = document.getElementById("button");
// let newt = document.getElementById("text");
// newt.src = "time/script.js";

let sw = window.innerWidth;
let sh = window.innerHeight;
let left = (sw-300)/2;

let btn = document.getElementById("extend");
let x = Math.random()*0.9*sw;
let y = Math.random()*0.75*sh;
// btn.style.left=x+"px";
// btn.style.top=y+"px";
// console.log(x, y);

// import {timeleft} from '/time/script1.js';
// let http = require('http');
// let timeleft = require('.time/script.js');

// let new_script = document.createElement("script");
// new_script.setAttribute("type", "text/javascript");
// new_script.setAttribute("src", "script1.js");
// document.body.appendChild(new_script);

function timer() {
  let win = window.open("index1.html", "_blank", "width=300, height=150, left="+left,"top=100");
  win.addEventListener("load", ()=>{
    setTimeout(()=>{
      win.close();
    }, 11000);
  })
}

function openManyWindows(){
  for(let i = 0; i < 1; i++){
    timer();
  }
}

function extend(){
  //btn.style.display = 'none';
  btn.style.left=x+"px";
  btn.style.top=y+"px";
  x = Math.random()*0.9*sw;
  y = Math.random()*0.75*sh;
  timeleft += 5;
  // console.log(x, y);
  // new_script.timeleft += 5;
  // console.log(new_script.timeleft);
}

button.addEventListener("click", openManyWindows);
btn.addEventListener("click", extend);
// console.log(timer);


//////////////
let timeleft= 11;
let tx = document.getElementById("text");
// export timeleft;
// let timer;

let timers = setInterval(function(){
  timeleft--;
  // console.log(timeleft);
  if (timeleft>=10){
    tx.textContent = "00:00:"+timeleft;
    // tx.innerHTML = "time";
    // console.log("timeleft>=10");
  }
  if (timeleft<10){
    // tx.innerHTML = "time";
    tx.textContent = "00:00:0"+timeleft;
    // console.log("timeleft<10");
  }
  if(timeleft<=-1){
    clearInterval(timers);
    timeleft= 0;
  }
},1000);

function extend(){
  timeleft+= 5;
}
// btn.addEventListener("click", extend);
