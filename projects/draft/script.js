// setInterval(()=>{
//   let text = secondsToString(secondsLeft)
//   win.changeText(text);
//   secondsLeft-=1;
//
//   if (secondsLeft <= -1) {
//     secondsLeft = 0;
//     win.close();
//     btn.style.display = "none";
//     page.style.backgroundColor = "black";
//     //console.log(secondsLeft);
//   }
//
// }, 1000)


///////////////////

// function setup () {
//   createCanvas(windowWidth, windowHeight)
//
//   for (let i = 0; i < BUGS_COUNT; i++) {
//     bugs.push(new Bug())
//   }
// }
//
// function draw () {
//   background(150)
//   for (let bug of bugs) {
//     bug.draw()
//   }
// }
//
// class Bug {
//   constructor () {
//     this.identity = random(200) + 200
//     this.speed = 0
//     this.noiseOneSeed = floor(random(10000))
//     this.noiseTwoSeed = floor(random(10000))
//   }
//
//   changes () {
//     const feed = frameCount / this.identity;
//     this.speed = noise(feed) * 20 + 100
//   }
//
//   draw () {
//     this.changes()
//     const feed = frameCount / this.speed
//     noiseSeed(this.noiseOneSeed)
//     const x = noise(feed) * width
//     noiseSeed(this.noiseTwoSeed)
//     const y = noise(feed) * height
//
//     fill(0)
//     circle(x, y, 3)
//   }
// }

////////////////
let t = 0.0;
let accel = 0.00;
let accelOud = 0.00;
let up = true;
//let intervalID;


function fly() {
	w = 0;
	h = 0;

	//IE
	if(!window.innerWidth)
	{
		//strict mode
		if(!(document.documentElement.clientWidth == 0))
		{
			w = document.documentElement.clientWidth;
			h = document.documentElement.clientHeight;
		}
		//quirks mode
		else
		{
			w = document.body.clientWidth;
			h = document.body.clientHeight;
		}
	}
	//w3c
	else
	{
		w = window.innerWidth;
		h = window.innerHeight;
	}

	xPos = w/2 - 50;
	yPos = h/2 - 5;
	xAmpl = w/3;
	yAmpl = h/3;

	x = xPos + xAmpl*Math.sin(20*Math.sin(t/3))*(Math.sin(10+t)+0.2)*Math.cos(t);
	y = yPos + yAmpl*Math.cos(20*Math.sin(t/3))*(Math.sin(10+t)+0.2)*Math.cos(t);

	obj = document.getElementById("fly");
	if(obj)
	{
		obj.style.left = x + "px";;
		obj.style.top = y + "px";;
	}
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
	//if (accel==accelOud)
	//alert(accel);
	t += accel;//0.1
	//setTimeout("fly()", 20);//50
}
