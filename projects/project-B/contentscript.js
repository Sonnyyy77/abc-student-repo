console.log("parasite");

let circle = chrome.extension.getURL("cute-animated.gif");

let sw=screen.width;
let sh=screen.height;
let div = document.createElement("DIV");
let img = document.createElement("IMG");

let palx = sw/2;
let paly = sh/2;
let pSpeedX = 0.1;
let pSpeedY = 0.05;

let parasite;

function show(){
  console.log("hello");
  // let div = document.createElement("DIV");
  // let img = document.createElement("IMG");
  // div.id = "home";
  img.src = circle;
  img.id = "circle";
  // div.appendChild(img);
  img.style.top = paly+"px";
  img.style.left = palx+"px";
  console.log(img.style);

  // palx+=pSpeedX;
  // paly+=pSpeedY;
  //
  // if (paly==(sh-50)){
  //   pSpeedY*=-1;
  // } else if (paly==0){
  //   pSpeedY*=-1;
  // }
  //
  // if (palx==(sw-50)){
  //   pSpeedX*=-1;
  // } else if (palx==0){
  //   pSpeedX*=-1;
  // }
  // img.style.width = "10%";
  // img.style.height = "10%";
  document.body.appendChild(img);
  parasite = document.getElementById("circle");
  parasite.style.zIndex = "9999";
  parasite.style.opacity = 1;
  parasite.style.display='inline';
  parasite.style.transform = "scale(1)";
  size = 1;
  opa = 1;
  // document.getElementById("circle").style.top = paly+"px";
  // document.getElementById("circle").style.left = palx+"px";
  // setInterval(move, 0);
}

function move(){
  palx+=pSpeedX;
  paly+=pSpeedY;

  if (paly==(sh-50)){
    pSpeedY*=-1;
  } else if (paly==0){
    pSpeedY*=-1;
  }

  if (palx==(sw-50)){
    pSpeedX*=-1;
  } else if (palx==0){
    pSpeedX*=-1;
  }

  parasite.style.top = paly+"px";
  parasite.style.left = palx+"px";
}


// setInterval(function(){
//   palx+=pSpeedX;
//   paly+=pSpeedY;
//
//   if (paly==(sh-50)){
//     pSpeedY*=-1;
//   } else if (paly==0){
//     pSpeedY*=-1;
//   }
//
//   if (palx==(sw-50)){
//     pSpeedX*=-1;
//   } else if (palx==0){
//     pSpeedX*=-1;
//   }
//   document.getElementById("circle").style.top = paly+"px";
//   document.getElementById("circle").style.left = palx+"px";
//
// }, 10);

function byebye(){
  var image_x = document.getElementById("circle");
  image_x.parentNode.removeChild(image_x);
}

let ptags = document.body.querySelectorAll("p");
let ignoreTags = ["SCRIPT", undefined, "PICTURE"];
let mouseDTag;
let mouseUTag;
let mx1 = 0;
let my1 = 0;
let mx2 = 0;
let my2 = 0;
let n1, n2;
let size=1;
let opa = 1;

function superFunctionForTags(tag){
  // console.log("tag", tag);
  // console.log("tagname", tag.tagName);
  if(ignoreTags.includes(tag.tagName) || tag.innerHTML == ""){
    return tag.outerHTML;
  }
  let emptyTag = tag.cloneNode();
  emptyTag.innerHTML = "";
  // console.log("empty", emptyTag.outerHTML)
  let outterTags = emptyTag.outerHTML.split("><");
  outterTags[0]+=">";
  outterTags[1]="<"+outterTags[1];

//   console.log("child", tag);
//   console.log("childtext", tag.innerText);
  let spanifiedString = "";
  for(let j = 0; j < tag.childNodes.length; j++){
    let cn = tag.childNodes[j];
//     console.log(cn)
    if(cn.nodeName == "#text"){
        let words = cn.textContent.trim().split(" ");
        let spans = words.map(word=>{return "<span class='leonleon'>"+word+"</span>"})
        let spanString = spans.join(" ")
//         console.log("spanstring:", spanString);

        spanifiedString+=spanString + " "
    }else{
        let spanString = superFunctionForTags(cn);
//         console.log("nested spanstring:", spanString);

        spanifiedString+=spanString + " "
    }
  }
  return outterTags[0] + spanifiedString.substring(0,spanifiedString.length-1)  + outterTags[1]

}

// for(let i = 0; i < ptags.length; i++){
//   let p = ptags[i];
//   let pstring = superFunctionForTags(p);
//   p.innerHTML = pstring;
// }
document.body.innerHTML = superFunctionForTags(document.body)

let leonleons = document.getElementsByClassName("leonleon")
for(let i = 0; i < leonleons.length; i++){
  // leonleons[i].addEventListener("mouseover", function(){
  //   leonleons[i].style.color = "coral"
  // });
  leonleons[i].addEventListener("mousedown", e => {
    mx1 = e.pageX;
    my1 = e.pageY;
    mouseDTag = leonleons[i];
    n1 = i;

  });
  leonleons[i].addEventListener("mouseup", ee => {
    mx2 = ee.pageX;
    my2 = ee.pageY;
    mouseUTag = leonleons[i];
    n2 = i;
    let sub = Math.abs(n2-n1);
    size+=sub*0.1;
    opa-=sub*0.015;
    // console.log(mouseUTag);
    // console.log(i);

    let selection = window.getSelection();
    let s = selection.toString();

    for (let j = n1; j<(n2+1); j++){
      // console.log(leonleons[j]);
      leonleons[j].style.opacity = 0;
      leonleons[j].style.transition = "all 3s";

      setTimeout(function(){leonleons[j].style.opacity = 1;},10000);
    }

    let cx = (mx1+mx2)/2;
    let cy = (my1+my2)/2;
    document.getElementById("circle").style.transition = "all 3s";
    document.getElementById("circle").style.left = (cx-50)+"px";
    document.getElementById("circle").style.top = (cy-50)+"px";
    document.getElementById("circle").style.transform = "scale("+size+")";
    document.getElementById("circle").style.opacity = opa;
    console.log(opa);

    if (opa<=0){
      document.getElementById("circle").style.display='none';
      // opa = 0;
    }
    // console.log(cx, cy);
    // console.log(mx1, my1, mx2, my2);
  });

  // for (let j = n1; j<n2+1; j++){
  //   console.log(leonleons[j])
  // }

  // leonleons[i].addEventListener("mouseup",checkForSelection);
}

// for (let j = n1; j<n2+1; j++){
//   console.log(leonleons[j])
// }
/*
function checkForSelection(event) {
   let selection = window.getSelection();

   if (selection!=undefined && mouseDTag!=undefined && mouseUTag!=undefined){
     let MX3 = mouseDTag.pageX;
     let MY3 = mouseDTag.pageY;
     let MX4 = mouseUTag.pageX;
     let MY4 = mouseUTag.pageY;
     console.log(mouseDTag.pageX, mouseDTag.pageY);
     let cx = (MX3+MY3)/2;
     let cy = (MX4+MY4)/2;
     document.getElementById("circle").style.transition = "all 2s";
     document.getElementById("circle").style.left = cx+"px";
     document.getElementById("circle").style.top = cy+"px";
   }
 }
*/

// show();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  // console.log(request);
  if(request.type == "display"){
    show();
    /*
    for (let i = 0; i < 1; i++) {
      let p = new Parasite();
      parasite.push(p);
      // let p = new Parasite();
      console.log(p.r1Min);
    }
    */
  }
  if(request.type == "disapear"){
    byebye();
  }
});

/*
let parasite = [];

function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("container-p5");
  canvas.hide();
  angleMode(DEGREES);

  // for (let i = 0; i < 1; i++) {
  //   parasite.push(new Parasite());
  // }
}

///////Parasite is here
function draw(){
  background(30);

  for (let p of parasite){
    p.update();
    p.display();
  }

  console.log("draw");

}

class Parasite{
  constructor(){
    this.r1Min = 0;
    this.r1Max = 0;
    this.r2Min = 0;
    this.r2Max = 0;
    this.r1 = 0;
    this.r2 = 0;
    this.r = this.r1+this.r2;
    this.x = 0;
    this.y = 0;

    this.cx = 0;
    this.cy = 0;
  }

  update(){
    this.cx+=0.5;
    this.cy+=0.1
  }

  display(){
    stroke(255);
    fill(0);

    translate(width/2, height/2);

    beginShape()
    for (let i=0; i<359; i++){
      this.r1Min = map(sin(frameCount), 0, 1, 50, 60);
      this.r1Max = map(sin(frameCount*3), 0, 1, 70, 55);
      this.r2Min = map(sin(frameCount/2), 0, 1, 80, 55);
      this.r2Max = map(sin(frameCount), 0, 1, 60, 80);
      this.r1 = map(sin(i*8), -1, 1, this.r1Min, this.r1Max);
      this.r2 = map(sin(i*5), -1, 1, this.r2Min, this.r2Max);
      this.r = this.r1 + this.r2;
      this.x = this.r * cos(i);
      this.y = this.r * sin(i);
      vertex(this.x, this.y);
    }
    endShape(CLOSE);
  }
}
*/
