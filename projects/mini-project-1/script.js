let flower = [];
flower[0] = "./assets/1.jpeg";
flower[1] = "./assets/2.jpeg";
flower[2] = "./assets/3.jpeg";
flower[3] = "./assets/4.jpg";
flower[4] = "./assets/5.jpeg";
flower[5] = "./assets/6.jpeg";
flower[6] = "./assets/7.jpeg";
flower[7] = "./assets/8.jpeg";
flower[8] = "./assets/9.jpeg";
flower[9] = "./assets/10.jpeg";
flower[10] = "./assets/11.jpeg";
flower[11] = "./assets/12.jpeg";
flower[12] = "./assets/13.jpeg";

// const image = document.querySelector("img");
const button = document.querySelector("button");
// document.getElementById("myFlowers").innerHTML = "";
let myFlowers = document.getElementById("myFlowers");
myFlowers.innerHTML="";
let val = document.getElementById("changeRange");
let clickTimes = 0;
// let myFlowers = document.getElementById("changeRange").innerHTML="";
// var pic = document.getElementsByTagName('img');
// console.log("value", rangeVal);

// window.onload = () => generatePicture(flower);
//
// button.addEventListener("click", () => generatePicture(flower));

function generatePicture(){

  if (clickTimes != 0){
    myFlowers.innerHTML="";
  }

  let rangeVal = val.value;
  console.log("value", rangeVal);
  // let randomNum2 = Math.floor(Math.random() * 20);
  // for (i=0; i<2;i++){
  for(let i = -1; i < rangeVal; i++){
    let img = document.createElement('img');
    img.src = flower[rangeVal];
    // image.setAttribute("src", array[rangeVal]);

      // for (var i=0;i<pic.length;i++) {
    let w=window.innerWidth-300;
    let h=window.innerHeight-400;
    let x = Math.random()*w;
    let y = Math.random()*(h-80)+80;
    console.log(x, y);

    img.style.left=x+"px";
    img.style.top=y+"px";

    document.getElementById("myFlowers").appendChild(img);
    clickTimes++;
      // }
    // add new generated squares into the div
    // document.getElementById("myFlowers").appendChild('img');
  }
}
