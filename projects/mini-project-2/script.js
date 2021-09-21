let button = document.getElementById("button");

let sw = window.innerWidth;
let sh = window.innerHeight;
let left = (sw-300)/2;

let btn = document.getElementById("extend");
let x = Math.random()*0.9*sw;
let y = Math.random()*0.75*sh;
// btn.style.left=x+"px";
// btn.style.top=y+"px";
// console.log(x, y);

let new_script = document.createElement("script");
new_script.setAttribute("type", "text/javascript");
new_script.setAttribute("src", "time/script.js");
document.body.appendChild(new_script);

function timer() {
  let win = window.open("time", "_blank", "width=300, height=150, left="+left,"top=100");
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
  console.log(x, y);
  timeleft += 5;
}

button.addEventListener("click", openManyWindows);
btn.addEventListener("click", extend);
