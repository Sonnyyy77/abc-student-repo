let button = document.getElementById("button");
let buttonMain = document.getElementById("myButton");
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

function secondsToString(seconds){
  // from: https://stackoverflow.com/a/25279340
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}

let secondsLeft = 10;

function timer() {
  let win = window.open("clock/index.html", "_blank", "width=300, height=150, left="+left,"top=100");

  setInterval(()=>{
    let text = secondsToString(secondsLeft)
    win.changeText(text);
    secondsLeft-=0.5;
  }, 500)


  // win.addEventListener("load", ()=>{
  //   setTimeout(()=>{
  //     win.close();
  //   }, 11000);
  // })
}

function openManyWindows(){
  for(let i = 0; i < 1; i++){
    timer();
  }
  buttonMain.style.display = 'none';
}

function extend(){
  //btn.style.display = 'none';
  btn.style.left=x+"px";
  btn.style.top=y+"px";
  x = Math.random()*0.9*sw;
  y = Math.random()*0.75*sh;
  secondsLeft+=5;
  // console.log(x, y);
  // new_script.timeleft += 5;
  // console.log(new_script.timeleft);
}

button.addEventListener("click", openManyWindows);
btn.addEventListener("click", extend);
// console.log(timer);
