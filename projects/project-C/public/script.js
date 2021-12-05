console.log("hi");
let socket = io();
let ball = [];
let users = [];
let me = [];
let walls = [];
let lose = document.getElementById("lose");
let begin = document.getElementById("begin");
let restart = document.getElementById("restart");
let wait = document.getElementById("wait");
let myselfX = 0;
let start = false;
let ballData = {x:0, y:0, vx:0, vy:0};
let userData = {id:"", x:0, y:0};
let allUserData = {};
let num;
let unumber;
let usernumber = [];

// socket.on("getID", (usernumber)=>{
  // for (let i = 0; i < usernumber.length; i++){
    // unumber = usernumber[i];
    // usersnumber.push(unumber);
    // console.log("no", unumber);
    // console.log("yey", usersnumber);
  // }
  // usersnumber = usernumber;
// });

// console.log("hello",usersnumber);

function setup(){
  createCanvas(windowWidth, windowHeight);

  //console.log(socket);
  // socket.on("user_position", receive);

  // myselfX = windowWidth/2;

  // ball.push(new Ball(windowWidth/2, windowHeight/2+179));
  socket.on("getID", (usernumber)=>{
  console.log("hello",usernumber);
  });

  console.log("hello",usernumber);

  walls.push(new Wall(windowWidth/2, windowHeight/2-230, 0, 255));
  walls.push(new Wall(windowWidth/2+230, windowHeight/2, PI/2, 255));
  walls.push(new Wall(windowWidth/2-230, windowHeight/2, PI/2, 255));

  users.push(new Me(windowWidth/2, windowHeight/2+215, 0, usernumber[0]));
  users.push(new Me(windowWidth/2, windowHeight/2-215, 0, usernumber[1]));
  users.push(new Me(windowWidth/2+215, windowHeight/2, PI/2, usernumber[2]));
  users.push(new Me(windowWidth/2-215, windowHeight/2, PI/2, usernumber[3]));

  // console.log(usersnumber[0]);
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
    // users[i].move();
    users[i].display();
    if (users[i].id == socket.id){
      // users[i].move();
      users[i].upDown();
      users[i].leftRight();
    }
    // console.log(users[i])
    // console.log(users[i].id);
  }

  // userData.id = socket.id;
  // userData.x = user[0].x;
  // userData.y = user[0].y;

  for (let i = 0; i < walls.length; i++){
    walls[i].display();
    // console.log(walls.length);
  }

  // if ((num+walls.length)>4){
  //   let minus = (num+walls.length) - 4;
  //   walls.splice(0, 1);
  //   console.log("minus", minus);
  // }

  // socket.emit('ball_position', ballData);
  // socket.emit('user_position', userData);


}

// socket.on("ball_position", (position)=>{
//   ball[0].x = position.x;
//   ball[0].y = position.y;
// });

// socket.emit('number', num);

socket.on("usernumber", (usernumber)=>{
  console.log(usernumber);
  num = usernumber.length;
  console.log("walls", walls.length);
  if (num >= 1){
    // users.push(new Me(windowWidth/2, windowHeight/2+215, 0, usernumber[0]));
    users[0].display();
    users[0].getId(usernumber[0]);
    for (let i = 0; i < walls.length; i++){
      walls[i].show();
    }
  }
  if (num >= 2){
    // users.push(new Me(windowWidth/2, windowHeight/2-215, 0, usernumber[1]));
    users[1].display;
    users[1].getId(usernumber[1]);
    walls[0].hide();
  }
  if (num >= 3){
    // users.push(new Me(windowWidth/2+215, windowHeight/2, PI/2, usernumber[2]));
    users[2].display;
    users[2].getId(usernumber[2]);
    walls[1].hide();
  }
  if (num >= 4){
    // users.push(new Me(windowWidth/2-215, windowHeight/2, PI/2, usernumber[3]));
    users[3].display;
    users[3].getId(usernumber[3]);
    walls[2].hide();
  }
})

// socket.on("startpeople", (id)=>{
//   if (id == socket.id){
//     begin.style.display = "inline";
//   }
//   if (id != socket.id){
//     wait.style.display = "inline";
//   }
// })

/*
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
*/

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
  constructor(x, y, r, o){
    // this.x = myselfX;
    // this.id = data.id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.id = 0;
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
  getId(id){
    this.id = id;
  }
  display(){
    push();
    fill(181, 67, 44);
    noStroke();
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(this.r);
    rect(0, 0, 100, 30);
    pop();
  }
}

class Wall{
  constructor(x, y, r, o){
    this.x = x;
    this.y = y;
    this.r = r;
    this.opacity = o;
  }
  show(){
    this.opacity = 255;
  }
  hide(){
    this.opacity = 0;
  }
  display(){
    push();
    fill(181, 67, 44, this.opacity);
    // console.log(this.opacity);
    stroke(255, this.opacity);
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(this.r);
    rect(0, 0, 400, 60);
    // fill(255, this.opacity);
    // console.log(this.opacity);
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
