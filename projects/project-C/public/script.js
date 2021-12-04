console.log("hi");
let socket = io();
let ball = [];
let users = [];
let me = [];
let walls = [];
let lose = document.getElementById("lose");
let begin = document.getElementById("begin");
let restart = document.getElementById("restart");
let myselfX = 0;
let start = false;
let ballData = {x:0, y:0, vx:0, vy:0};
let userData = {id:"", x:0, y:0};
let allUserData = {};
let num;

function setup(){
  createCanvas(windowWidth, windowHeight);

  //console.log(socket);
  // socket.on("user_position", receive);

  // myselfX = windowWidth/2;

  // ball.push(new Ball(windowWidth/2, windowHeight/2+179));

  // walls.push(new Wall(windowWidth/2+230, windowHeight/2, PI/2));
  // walls.push(new Wall(windowWidth/2-230, windowHeight/2, PI/2));
  // walls.push(new Wall(windowWidth/2, windowHeight/2-230, 0));

  // user.push(new Me(windowWidth/2, windowHeight/2+215));

  // for (let i = 0; i < 1; i++){
  //   let u = new User(myselfX, windowHeight/2+215);
  //   users.push(u);
  // }

  socket.emit('number', num);


  restart.addEventListener("click", ()=>{
    window.location.reload();
  })
}

// restart.addEventListener("click", ()=>{
//   canvas.reset();
// })

function draw(){
  background(255);


  /*
  for (let i = 0; i < 1; i++){
    // ball[i].move();
    ball[i].display();
  }
  */

  // console.log("ball", ball[0].y);


  /*
  for (let i = ball.length - 1; i >= 0; i--) {
    let b = ball[i];
    if (b.y>=windowHeight) {
      // ball.splice(i, 1);
      ball[i].y = windowHeight + 30;
      lose.style.display = "inline";
    }
  }
  */

  /*
  if (start) {
    for (let i = 0; i < 1; i++){
      ball[i].move();
    }
  }*/

  // ballData.x = ball[0].x;
  // ballData.y = ball[0].y;
  // ballData.vx = ball[0].vx;
  // ballData.vy = ball[0].vy;

  // for (let i = 0; i < 1; i++){
  //   //users[i].move();
  //   user[i].leftRight();
  //   user[i].

  for (let i = 0; i < num; i++){
    // users[i].upDown();
    // users[i].leftRight();
    users[i].display();
  }

  // userData.id = socket.id;
  // userData.x = user[0].x;
  // userData.y = user[0].y;

  // for (let i = 0; i < 3; i++){
  //   walls[i].display();
  // }

  // socket.emit('ball_position', ballData);
  // socket.emit('user_position', userData);


}

// socket.on("ball_position", (position)=>{
//   ball[0].x = position.x;
//   ball[0].y = position.y;
// });

socket.on("usernumber", (usernumber)=>{
  num = usernumber.length;
  if (num >= 1){
    users.push(new Me(windowWidth/2, windowHeight/2+215, 0));
    console.log(num)
  }
  if (num >= 2){
    users.push(new Me(windowWidth/2, windowHeight/2-215, 0));
  }
  if (num >= 3){
    users.push(new Me(windowWidth/2+215, windowHeight/2, 0));
  }
  if (num >= 4){
    users.push(new Me(windowWidth/2-215, windowHeight/2, 0));
  }
})

function receive(data){
  allUserData[data.id] = data;

  let matched = false;
  for (let u of users) {
    if (data.id === u.id) {
      users.push(new Me(windowWidth/2, windowHeight/2+215, 0));
      // u.update(data);
      matched = true;
    }
  }

  if (!matched) {
    if (users.length == 2){
      users.push(new Me(windowWidth/2, windowHeight/2-215, 0));
      walls.splice(0, 1);
    }
    else if (users.length == 3){
      users.push(new Me(windowWidth/2+215, windowHeight/2, PI/2));
      walls.splice(0, 1);
    }
    else if (users.length == 4){
      users.push(new Me(windowWidth/2-215, windowHeight/2, PI/2));
      walls.splice(0, 1);
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    start = true;
    begin.style.display = "none";
  }
}

class Ball{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.vx = random(2, 4);
    this.vy = random(-2, -4);
    this.isDone = false;
  }
  checkOutOfCanvas(){
    if (this.y >= windowHeight){
      this.isDone = true;
    }
  }
  move(){
    if (this.x <= (windowWidth/2-180) || this.x >= (windowWidth/2+180)){
      if (this.y <= (windowHeight/2+180)){
        this.vx *= -1;
      }
    }
    if (this.y <= (windowHeight/2-180)){
      this.vy *= -1;
    }
    else if (this.y >= windowHeight/2+180 && this.y <= windowHeight/2+185 && this.x > myselfX-50 && this.x <= myselfX+50){
      this.vy *= -1;
    }
    this.x += this.vx;
    this.y += this.vy;
  }
  display(){
    fill(255, 255, 0);
    stroke(0);
    ellipse(this.x, this.y, 40);
  }
}

/*
class User{
  constructor(data){
    this.id = data.id;
    this.x = data.x;
    this.y = data.y;
  }
  update(){
    fill(181, 67, 44);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, 100, 30);
  }
}
*/

class Me{
  constructor(x, y, r){
    // this.x = myselfX;
    // this.id = data.id;
    this.x = x;
    this.y = y;
    this.r = r;
  }
  leftRight(){
    if (keyIsDown(LEFT_ARROW) && this.x > 50) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < windowWidth-50) {
      this.x += 5;
    }
  }
  upDown(){
    if (keyIsDown(UP_ARROW) && this.y > 50) {
      this.y += 5;
    }
    if (keyIsDown(DOWN_ARROW) && this.y < windowHeight-50) {
      this.y -= 5;
    }
  }
  display(){
    push();
    fill(181, 67, 44);
    noStroke();
    rectMode(CENTER);
    rotate(this.r);
    rect(this.x, this.y, 100, 30);
    pop();
  }
}

class Wall{
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
  }
  display(){
    push();
    fill(181, 67, 44);
    stroke(255);
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(this.r);
    rect(0, 0, 400, 60);
    fill(255);
    line(-200, 0, 200, 0);
    line(-50, 0, -50, 30);
    line(50, 0, 50, 30);
    line(0, 0, 0, -30);
    line(-100, 0, -100, -30);
    line(100, 0, 100, -30);
    line(-150, 0, -150, 30);
    line(150, 0, 150, 30);
    pop();
  }
}
