let img3 = "bottle.png";
let img4 = "firefly.png";
let bottle = document.getElementById("bottle");

let t = 0.0;
let accel = 0.00;
let accelOud = 0.00;
let up = true;

function addOne(){
  let img = document.createElement('img');
  img.setAttribute("id", "firefly");
  img.src = img4;
  let w=window.innerWidth-25;
  let h=window.innerHeight-35;
  let x = Math.random()*((w-100)-100)+100;
  let y = Math.random()*((h-20)-80)+80;
  console.log(x, y);

  img.style.left=x+"px";
  img.style.top=y+"px";
  img.style.width="10%";
  img.style.height="10%";
  img.style.zIndex="9999";
  img.style.position="absolute";
  bottle.appendChild(img);

//   setInterval(()=>{
// 	xAmpl = w/15;
// 	yAmpl = h/15;
//
//   x = x + xAmpl*Math.sin(20*Math.sin(t/3))*(Math.sin(10+t)+0.2)*Math.cos(t);
// 	y = y + yAmpl*Math.cos(20*Math.sin(t/3))*(Math.sin(10+t)+0.2)*Math.cos(t);
//
// 	obj = document.getElementById("firefly");
// 	if(obj)
// 	{
// 		obj.style.left = x + "px";;
// 		obj.style.top = y + "px";;
// 	}
// 	accelOud = accel;
// 	if (up) {
// 		if (accel<0.05) {
// 			accel += 0.01;
// 			accel = Math.round(accel*100)/100;
// 		}
// 		if (accel==0.05) up = false;
// 	}
// 	else {
// 		if (accel>0.00) {
// 			accel -= 0.01;
// 			accel = Math.round(accel*100)/100;
// 		}
// 		if (accel==0.00) up = true;
// 	}
// 	//if (accel==accelOud)
// 	//alert(accel);
// 	t += accel;
// }, 50)
}
