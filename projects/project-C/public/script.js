console.log("hi");
let socket = io();
let ball = [];
let users = [];
let walls = [];
let topWall = [];
let canvas;
let note = document.getElementById("note");
let restart = document.getElementById("restart");

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);

  ball.push(new Ball(windowWidth/2, (windowHeight/4)*3+5));

  walls.push(new Wall(windowWidth-windowWidth/6, windowHeight/2, PI/2));
  walls.push(new Wall(windowWidth/6, windowHeight/2, PI/2));
  walls.push(new Wall(windowWidth/2, windowHeight/7, 0));

  topWall.push(new Wall1(windowWidth/2, windowHeight/7, 0))

  for (let i = 0; i < 1; i++){
    let u = new User(windowWidth/2, (windowHeight/4)*3+40);
    users.push(u);
  }
}

restart.addEventListener("click", ()=>{
  canvas.reset();
})

function draw(){
  background(255);
  for (let i = 0; i < 1; i++){
    ball[i].move();
    ball[i].display();
    // if (keyIsPressed == ENTER){
    //   ball[i].move();
    //   console.log("Key is pressed");
    // }
  }

  // console.log("brick:", users[0].x);

  for (let i = ball.length - 1; i >= 0; i--) {
    let b = ball[i];
    if (b.y>=windowHeight) {
      // ball.splice(i, 1);
      ball.y = windowHeight + 1;
      note.style.display = "inline";
    }
  }

  // if (keyCode === ENTER) {
  //   for (let i = 0; i < 1; i++){
  //     ball[i].move();
  //   }
  // }

  for (let i = 0; i < 1; i++){
    //users[i].move();
    users[i].update();
    users[i].display();
  }

  for (let i = 0; i < 3; i++){
    walls[i].display();
  }

  for (let i = 0; i < 1; i++){
    topWall[i].display();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    // for (let i = 0; i < 1; i++){
    //   ball[i].move();
    // }
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
    if (this.x <= (windowWidth/6+50) || this.x >= (windowWidth-windowWidth/6-50)){
      if (this.y <= (windowHeight/4)*3+40){
        this.vx *= -1;
      }
    }
    if (this.y <= (windowHeight/7+50)){
      this.vy *= -1;
    }
    else if (this.y+25 >= users[0].y && this.x >= users[0].x && this.x+20 <= users[0].x+50){
      this.vy *= -1;
    }
    // console.log(this.y);
    // if (this.y >= ((windowHeight/4)*3+6) || this.y <= (windowHeight/7+50)){
    //   this.vy *= -1;
    // }
    this.x += this.vx;
    this.y += this.vy;
  }
  display(){
    fill(255, 255, 0);
    stroke(0);
    ellipse(this.x, this.y, 40);
    // console.log("window:", windowHeight);
    // console.log("ball:", this.y);
  }
}

class User{
  constructor(x, y){
    this.x = x;
    this.y = y;
    // this.vx = random(2, 4);
    // this.vy = random(2, 4);
  }
  update(){
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
  }
  display(){
    fill(181, 67, 44);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, 100, 30);
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
    rect(0, 0, (windowHeight/4*3-90), 60);
    fill(255);
    line(-windowHeight/8*3-45, 0, windowHeight/8*3-45, 0);
    line(-50, 0, -50, 30);
    line(50, 0, 50, 30);
    line(0, 0, 0, -30);
    line(-100, 0, -100, -30);
    line(100, 0, 100, -30);
    pop();
  }
}

class Wall1{
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
    rect(0, 0, (windowWidth/6*4), 60);
    fill(255);
    line(-windowWidth/3, 0, windowWidth/3, 0);
    line(-windowWidth/7, 0, -windowWidth/7, 30);
    line(windowWidth/7, 0, windowWidth/7, 30);
    line(0, 0, 0, -30);
    line(-windowWidth/4, 0, -windowWidth/4, -30);
    line(windowWidth/4, 0, windowWidth/4, -30);
    pop();
  }
}
