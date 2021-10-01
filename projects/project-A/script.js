let BUGS_COUNT = 10;
let img = "firefly.png";
let myButton = document.getElementById("myButton");
let button = document.getElementById("button");
let sw = screen.width;
let sh = screen.height;
let start;
let caught = false;

let botX = sw-248;
let botY = sh-350.8;

let firefly = document.getElementById("firefly");
firefly.innerHTML="";


let localFlies = [];
let externalFlies = []

function showFireflies() {

  //generateBottle();

  let bottle = window.open("bottle/index.html", "_blank", "width=350, height=350, left="+botX+", top="+botY);
  bottle.addEventListener("load", ()=>{

    //bottle.focus();

    start = setInterval(()=>{
      let ranX = Math.random()*((sw-250)-10)+10;
      let ranY = Math.random()*((sh-350.8)-40)+40;
      let speed = Math.random()*(10-5)+5;
      let fly = window.open("bugs/index.html", "_blank", "width=82.67, height=116.93, left="+ranX+", top="+ranY);

      // let move = false;

      //http://www.mouchette.org/
      let t = 0.0;
      let accel = 0.00;
      let accelOud = 0.00;
      let up = true;

    	let xAmpl = sw/3;
    	let yAmpl = sh/3;

      fly.addEventListener("load", ()=>{
        //fly.focus();

        fly.mailbox(bottle.addOne);

        let interval = setInterval(()=>{
          //ranX+=speed;
          x = ranX + xAmpl*Math.sin(20*Math.sin(t/3))*(Math.sin(10+t)+0.2)*Math.cos(t);
        	y = ranY + yAmpl*Math.cos(20*Math.sin(t/3))*(Math.sin(10+t)+0.2)*Math.cos(t);

          fly.moveTo(x, y);

          //console.log(x, y);

          accelOud = accel;
        	if (up) {
        		if (accel<0.05) {
        			accel += 0.01;
        			accel = Math.round(accel*100)/100;
        		}
        		if (accel==0.05) up = false;
        	}
        	else {
        		if (accel>0.00) {
        			accel -= 0.01;
        			accel = Math.round(accel*100)/100;
        		}
        		if (accel==0.00) up = true;
        	}
        	t += accel;

        }, 50)
      })

      // fly.addEventListener("click", ()=>{
      //   fly.mailbox(bottle.addOne);
      //   fly.close();
      //   caught = true;
      // })


      setTimeout(()=>{
        // main = true;
        //console.log("trying to turn fly into local, checking if fly is still defined after catchin it", fly);
        fly.close();
        // make fly appear in main window
        let x = 0//Math.random()*window.innerWidth;
        let y = Math.random()*window.innerHeight;
        let localFly = document.createElement('img');
        // let opacity = 1;

        // if (opacity<=1 && opacity >0) {
        //   opacity--;
        // }
        // else if(opacity<=0) {
        //   opacity++;
        // }


        localFly.src = img;
        localFly.style.left = x+"px";
        localFly.style.top = y+"px";
        localFly.style.position="absolute";
        localFly.style.width = "3%";
        localFly.style.height = "5%";
        // localFly.style.opacity = opacity;
        firefly.appendChild(localFly);



        if (fly.window != null){
        localFlies.push({
          x: x,
          y: y,
          img: localFly,
          speedX: 1 + Math.random()*3,
          speedY: 1 + Math.random()*3
          // opacity: opacity
        });
      }

        // fly.addEventListener("click", ()=>{
        //   for (let i = localFlies.length - 1; i >= 0; i--) {
        //   localFlies.splice(i, 1);
        // }
        // })

        // fly.addEventListener("click", ()=>{
        //   for (let i = particle.length - 1; i >= 0; i--) {
        //   localFlies.splice(i, 1);
        // }
        // console.log(localFlies.length);
        // })

        //console.log(localFlies[0])
      }, 5000);


      // fly.addEventListener("click", ()=>{
      //   for (let i = localFlies.length - 1; i >= 0; i--) {
      //   localFlies.splice(i, 1);
      // }
      // })

      //console.log(localFlies.length);

      externalFlies.push({
        x: ranX,
        y: ranY,
        //speed: ranSpeed,
        name: "harry",
        win: fly
      })


      }, 2000)
      // console.log(main);

      // fly.addEventListener("click", ()=>{
      //   fly.close();
      //   main = false;
      // })

      // let ww = window.innerWidth;
      // let wh = window.innerHeight;
      // let rx = Math.random()*((ww-250)-10)+10;
      // let ry = Math.random()*((wh-250)-10)+10;


      // setInterval(()=>{
      // if (main == true) {
      //   let exist = document.createElement('img');
      //   exist.src = img;
      //   exist.style.left = rx+"px";
      //   exist.style.top = ry+"px";
      //   exist.style.width = "5%";
      //   exist.style.height = "5%";
      //   // exist.style.zIndex="9999";
      //   exist.style.position="absolute";
      //   firefly.appendChild(exist);
      // }
    // }, 100)

    // }, 2000)

    //console.log(time);
    setTimeout(()=>{
      clearInterval(start);
    }, 20000);

  myButton.style.display = "none";
})
}

// let maxFlies = 5;
// let flyCount = 0;

/*
function createExternalFlies(){
  if(flyCount>=maxFlies){
    return // wont run the rest of this function
  }

  console.log("new fly!")
  // let ranX = Math.random()*((sw-250)-10)+10;
  // let ranY = Math.random()*((sh-350.8)-40)+40;
  // let ranSpeed = Math.random()*(10-5)+5;
  // let flyWindow = window.open("bugs/index.html", "_blank", "width=82.67, height=116.93, left="+ranX+", top="+ranY);


  flyWindow.addEventListener("load", ()=>{
    flyWindow.mailbox(bottle.addOne);

    // externalFlies.push({
    //   x: ranX,
    //   y: ranY,
    //   speed: ranSpeed,
    //   name: "harry",
    //   win: flyWindow
    // })
    let randomTimeOutForNextFly = 2000 + Math.random()*6000;
    console.log("next on in ", randomTimeOutForNextFly/1000, "seconds");

    setTimeout(createExternalFlies, randomTimeOutForNextFly)
  })

  flyCount++;
}*/


// let bottle = window.open("bottle/index.html", "_blank", "width=350, height=350, left="+botX+", top="+botY);
// bottle.addEventListener("load", createExternalFlies)

setInterval(()=>{
  //
  for(let i =0; i< externalFlies.length; i++){
    // move external flies here
    // button.addEventListener("click", ()=>{
    //
    // })
  }
  //let opacity = 1;
  // local flies
  for(let i =0; i< localFlies.length; i++){
    //move local flies
    localFlies[i].x = localFlies[i].x + localFlies[i].speedX;
    localFlies[i].y = localFlies[i].y + localFlies[i].speedY;
    localFlies[i].img.style.left = localFlies[i].x+"px";
    localFlies[i].img.style.top = localFlies[i].y+"px";
    // localFlies[i].img.style.opacity = localFlies[i].opacity;
    if(localFlies[i].x > window.innerWidth || localFlies[i].x < 0){
      localFlies[i].speedX *= -1;
    }
    if(localFlies[i].y > window.innerHeight || localFlies[i].y < 0){
      localFlies[i].speedY *= -1;
    }

  }


}, 50)


button.addEventListener("click", showFireflies);

//////////////////////////////////





// function map(value, x1, y1, x2, y2){
//   return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
// }

// function generateBottle() {
//   let botX = sw-248;
//   let botY = sh-350.8;
//   let win2 = window.open("bottle/index.html", "_blank", "width=248, height=350.8, left="+botX+", top="+botY);
// }


/*function generateFireflies() {
  let ranX;
  // ranX = map(ranX, 0, screen.width, 0, Math.random()*sw - 248);
  ranX = Math.random()*((sw-250)-10)+10;
  let ranY = Math.random()*sh - 350.8;
  let speed = Math.random()*(10-5)+5;
  let win = window.open("bugs/index.html", "_blank", "width=124, height=175.4, left="+ranX+", top="+ranY);
  let move = false;

  win.addEventListener("load", ()=>{
    let interval = setInterval(()=>{
      ranX+=speed;
      win.moveTo(ranX, ranY);
      if (ranX <= 0 || ranX >= (sw-124)){
        speed*=-1;
        //win.moveTo(ranX, ranY);
      }
    }, 50)
  })

  setTimeout(()=>{
    win.close();
  }, 5000);

  // win.addEventListener("click", ()=>{
  //
  //   win.close();
  //   //win2.document.getElementById("bottle").appendChild(img);
  //   // ranX+=0;
  //   // ranY+=0;
  // })

  // win.addEventListener("mousedown", ()=>{
  //   //win.moveTo(mouseX, mouseY);
  //   // ranX+=0;
  //   // ranY+=0;
  //   move = true;
  // })
  //
  //
  // //https://www.w3schools.com/jsref/event_screenx.asp
  // win.addEventListener("mousemove", function(e){
  //   //win.moveTo(mouseX, mouseY);
  //
  //   if (move) {
  //     let mouseX = e.screenX;
  //     let mouseY = e.screenY;
  //     let disX = Math.abs(e.screenX - (sw-248));
  //     let disY = Math.abs(e.screenY - (sh-350.8));
  //     win.moveTo(mouseX, mouseY);
  //     console.log(mouseX, mouseY);
  //     if (disX<=0 && disY<=0) {
  //       win.close();
  //     }
  //   }
  // })
  //
  // win.addEventListener("mouseup", ()=>{
  //   // if (disX<=0 && disY<=0) {
  //   //   win.close();
  //   // }
  //   move = false;
  // })

}*/
