console.log("hi");
let socket = io();
let ball = [];
let users = [];
let me = [];
let walls = [];
let lose = document.getElementById("lose");
let lose_wait = document.getElementById("lose_wait");
let begin = document.getElementById("begin");
let restart = document.getElementById("restart");
let wait = document.getElementById("wait");
let body = document.getElementById("body");
let loseuser = document.getElementById("loseman");
let loseuser1 = document.getElementById("loseman1");
let myselfX = 0;
let start = false;
let move = false;
let ballData = { move: move, x: 0, y: 0 };
let userData = { id: "", number: 0, x: 0, y: 0 };
let num;
let width = 520;
let height = 520;
let usernumber = [];
let rotation;

function setup() {
  let canva = createCanvas(width, height);
  canva.id("p5-canvas");
  canva.parent("wrapper");
  // canva.position(windowWidth / 2 - 260, windowHeight / 2 - 260);

  ball.push(new Ball(width / 2, height / 2 + 179));
  socket.on("getID", usernumber => {
    console.log("hello", usernumber);
  });


  // for (let i = 0; i < users.length; i++){
  //   rotation = 90*(i-1);
  //   if (users[i].id == socket.id){
  //     console.log("yes!!!");
  //     document.getElementById("p5-canvas").style.transform = "rotate("+rotation+"deg)";
  //     document.getElementById("p5-canvas").style.position = "relative";
  //   }
  // }
  // if (users[1].id == socket.id){
  //   document.getElementById("p5-canvas").style.transform = "rotate(180deg)";
  // document.getElementById("p5-canvas").style.position = "relative";
  // }

  // console.log("hello",usernumber);

  walls.push(new Wall(width / 2, height / 2 - 230, 0, 255));
  walls.push(new Wall(width / 2 + 230, height / 2, PI / 2, 255));
  walls.push(new Wall(width / 2 - 230, height / 2, PI / 2, 255));

  users.push(new Me(width / 2, height / 2 + 215, 0, usernumber[0]));
  users.push(new Me(width / 2, height / 2 - 215, 0, usernumber[1]));
  users.push(new Me(width / 2 + 215, height / 2, PI / 2, usernumber[2]));
  users.push(new Me(width / 2 - 215, height / 2, PI / 2, usernumber[3]));

  socket.emit("number", num);

  // restart.addEventListener("click", () => {
  //   window.location.reload();
  //   lose.style.display = "none";
  //   lose_wait.style.display = "none";
  //   ball[0].x = width / 2;
  //   ball[0].y = height / 2 + 179;
  //   //when reload, the sequence of the users change, and the lose/lose_wait keep displaying?
  // });
}

restart.addEventListener("click", () => {
  // window.location.reload();
  lose.style.display = "none";
  lose_wait.style.display = "none";
  begin.style.display = "inline";
  ball[0].x = width / 2;
  ball[0].y = height / 2 + 179;
  ball[0].lose = 0;
  start = false;
  users[0].x = width / 2;
  users[0].y = height / 2 + 215;
  users[1].x = width / 2;
  users[1].y = height / 2 - 215;
  users[2].x = width / 2 + 215;
  users[2].y = height / 2;
  users[3].x = width / 2 - 215;
  users[3].y = height / 2;
  ballData.x = ball[0].x;
  ballData.y = ball[0].y;
  socket.emit("ball_position", ballData);
  for (let i = 0; i < users.length; i++) {
    userData.x = users[i].x;
    userData.y = users[i].y;
    userData.number = i;
    socket.emit("user_position", userData);
  }
  socket.emit("clear", "none");
  // console.log(userData);
  //when reload, the sequence of the users change, and the ball disappear?
});

function draw() {
  background(255);


  // ball[i].move();
  ball[0].display();
  ball[0].checkOutOfCanvas();
  // console.log("who lose", ball[i].lose);

  // console.log("ball", ball[0].y);

  if (
    ball[0].y >= 520 ||
    ball[0].y <= 0 ||
    ball[0].x >= 520 ||
    ball[0].x <= 0
  ) {
    // ball.splice(i, 1);
    ball[0].x = -50;
    ball[0].y = -50;
    if (ball[0].lose != 0){
      loseuser.innerHTML = "Oops!!! Player " + ball[0].lose + " lose :(";
    }
    if (users[0].id == socket.id) {
      lose.style.display = "inline";
    } else if (users[0].id != socket.id) {
      lose_wait.style.display = "inline";
    }
    // lose.style.display = "inline";
  }

  if (begin.style.display != "none") {
    lose.style.display = "none";
  }

  if (wait.style.display != "none") {
    lose_wait.style.display = "none";
  }

  // console.log("ball", ball[0].x, ball[0].y);

  if (start && users[0].id == socket.id) {
    for (let i = 0; i < 1; i++) {
      ball[i].move();
    }
    ballData.move = move;
    ballData.x = ball[0].x;
    ballData.y = ball[0].y;
    // ballData.vx = ball[0].vx;
    // ballData.vy = ball[0].vy;
    // console.log(ballData);
    socket.emit("ball_position", ballData);
  }

  // ballData.move = false;
  // ballData.x = ball[0].x;
  // ballData.y = ball[0].y;
  // ballData.vx = ball[0].vx;
  // ballData.vy = ball[0].vy;
  // console.log(ballData);
  // socket.emit('ball_position', ballData);

  for (let i = 0; i < num; i++) {
    // users[i].upDown();
    // users[i].leftRight();
    // users[i].move();
    users[i].display();
    if (users[i].id == socket.id) {
      document.getElementById("player").innerHTML = "You're Player "+(i+1);
      if (i == 0) {
        users[i].leftRight();
      }
      if (i == 1) {
        users[i].Rightleft();
        // console.log(users[i].x);
      }
      if (i == 2) {
        users[i].upDown();
      }
      if (i == 3) {
        users[i].Downup();
      }
      userData.id = socket.id;
      userData.number = i;
      userData.x = users[i].x;
      userData.y = users[i].y;
      // console.log(userData);
      socket.emit("user_position", userData);
      // users[i].move();
      // users[i].upDown();
      // users[i].leftRight();
    }
    // console.log(users[i])
    // console.log(users[i].id);
  }

  for (let i = 0; i < walls.length; i++) {
    walls[i].display();
    // console.log(walls.length);
  }

  // if ((num+walls.length)>4){
  //   let minus = (num+walls.length) - 4;
  //   walls.splice(0, 1);
  //   console.log("minus", minus);
  // }
}

// socket.emit('number', num);

//replace walls with bricks based on the sequence
socket.on("usernumber", usernumber => {
  // console.log(usernumber);
  num = usernumber.length;
  // console.log("walls", walls.length);
  if (num >= 1) {
    // users[0].display();
    users[0].getId(usernumber[0]);
    for (let i = 0; i < walls.length; i++) {
      walls[i].show();
    }
  }
  if (num >= 2) {
    // users[1].display();
    users[1].getId(usernumber[1]);
    walls[0].hide();
    //   document.getElementById("p5-canvas").style.transform = "rotate(180deg)";
    //   document.getElementById("p5-canvas").style.position = "relative";
  }
  if (num >= 3) {
    // users[2].display();
    users[2].getId(usernumber[2]);
    walls[1].hide();
  }
  if (num >= 4) {
    // users[3].display();
    users[3].getId(usernumber[3]);
    walls[2].hide();
  }

  adjustLayout();
});

function adjustLayout(){
  let intendedcanvassize = 0;
  if(window.innerWidth<window.innerHeight){
    intendedcanvassize = width<window.innerWidth?width:window.innerWidth;
  }else{
    intendedcanvassize = height<window.innerHeight?height:window.innerHeight;
  }
  let scaleFactor = intendedcanvassize/width;
  console.log(intendedcanvassize)
  console.log(scaleFactor)
  if (users[0].id == socket.id) {
    // console.log("I'm the second one");
    document.getElementById("p5-canvas").style.transform = "rotate(0deg) scale("+scaleFactor+")";
    document.getElementById("p5-canvas").style.position = "relative";
  }
  if (users[1].id == socket.id) {
    // console.log("I'm the second one");
    document.getElementById("p5-canvas").style.transform = "rotate(180deg) scale("+scaleFactor+")";
    document.getElementById("p5-canvas").style.position = "relative";
  }
  if (users[2].id == socket.id) {
    // console.log("I'm the third one");
    document.getElementById("p5-canvas").style.transform = "rotate(90deg) scale("+scaleFactor+")";
    document.getElementById("p5-canvas").style.position = "relative";
  }
  if (users[3].id == socket.id) {
    // console.log("I'm the fourth one");
    document.getElementById("p5-canvas").style.transform = "rotate(270deg) scale("+scaleFactor+")";
    document.getElementById("p5-canvas").style.position = "relative";
  }
}

socket.on("startpeople", id => {
  console.log("start people", id);
  if (id == socket.id) {
    begin.style.display = "inline";
    wait.style.display = "none";
    lose_wait.style.display = "none";
  } else if (id != socket.id) {
    begin.style.display = "none";
    wait.style.display = "inline";
    lose.style.display = "none";
  }
});

socket.on("upload_position", positionData => {
  // let otherID = positionData.id;
  let seq = positionData.number;
  if (num >= 2) {
    users[seq].x = positionData.x;
    users[seq].y = positionData.y;
  }
  // if (num >= 3){
  //   users[2].display();
  //   users[2].getId(usernumber[2]);
  //   walls[1].hide();
  // }
  // if (num >= 4){
  //   users[3].display();
  //   users[3].getId(usernumber[3]);
  //   walls[2].hide();
  // }
});

socket.on("clearCan", clear => {
  lose_wait.style.display = "none";
  wait.style.display = "inline";
})

////////接收球的位置
socket.on("move_ball", bData => {
  if (num >= 2) {
    ball[0].x = bData.x;
    ball[0].y = bData.y;
    // ball[0].vx = bData.vx;
    // ball[0].vy = bData.vy;
  }
  if (bData.move == true) {
    wait.style.display = "none";
  }
});

function keyPressed() {
  if (keyCode === ENTER) {
    start = true;
    begin.style.display = "none";
    move = true;
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(1.5, 2.5);
    this.vy = random(-1.5, -2.5);
    this.isDone = false;
    this.lose = 0;
  }
  checkOutOfCanvas() {
    if (
      this.y >= 450 &&
      this.x >= width / 2 - 180 &&
      this.x <= width / 2 + 180
    ) {
      this.lose = 1;
    }
    if (
      this.y <= 70 &&
      this.x >= width / 2 - 180 &&
      this.x <= width / 2 + 180
    ) {
      this.lose = 2;
    }
    if (
      this.x >= 450 &&
      this.y >= height / 2 - 180 &&
      this.y <= height / 2 + 180
    ) {
      this.lose = 3;
    }
    if (
      this.x <= 70 &&
      this.y >= height / 2 - 180 &&
      this.y <= height / 2 + 180
    ) {
      this.lose = 4;
    }
  }
  move() {
    // console.log("length", num);
    // console.log("x", this.x);
    if (num == 1) {
      if (this.x <= width / 2 - 180 || this.x >= width / 2 + 180) {
        this.vx *= -1;
      }
      if (this.y <= height / 2 - 180) {
        this.vy *= -1;
      }
      if (
        this.y >= height / 2 + 180 &&
        this.y <= height / 2 + 185 &&
        this.x > users[0].x - 65 &&
        this.x <= users[0].x + 65
      ) {
        this.vy *= -1.02;
      }
    }

    if (num == 2) {
      // console.log("x", this.x);
      if (this.x <= width / 2 - 180 || this.x >= width / 2 + 180) {
        this.vx *= -1;
        // console.log("bounce");
      }
      if (
        this.y >= height / 2 + 180 &&
        this.y <= height / 2 + 185 &&
        this.x > users[0].x - 65 &&
        this.x <= users[0].x + 65
      ) {
        this.vy *= -1.02;
      }
      if (
        this.y <= height / 2 - 180 &&
        this.y >= height / 2 - 185 &&
        this.x > users[1].x - 65 &&
        this.x <= users[1].x + 65
      ) {
        this.vy *= -1.03;
      }
    }

    if (num == 3) {
      if (this.x <= width / 2 - 180) {
        this.vx *= -1;
      }
      if (
        this.y >= height / 2 + 180 &&
        this.y <= height / 2 + 185 &&
        this.x > users[0].x - 65 &&
        this.x <= users[0].x + 65
      ) {
        this.vy *= -1.02;
      }
      if (
        this.y <= height / 2 - 180 &&
        this.y >= height / 2 - 185 &&
        this.x > users[1].x - 65 &&
        this.x <= users[1].x + 65
      ) {
        this.vy *= -1.03;
      }
      if (
        this.x >= width / 2 + 180 &&
        this.x <= width / 2 + 185 &&
        this.y > users[2].y - 65 &&
        this.y <= users[2].y + 65
      ) {
        this.vx *= -1.01;
      }
    }

    if (num == 4) {
      if (
        this.y >= height / 2 + 180 &&
        this.y <= height / 2 + 185 &&
        this.x > users[0].x - 65 &&
        this.x <= users[0].x + 65
      ) {
        this.vy *= -1.02;
      }
      if (
        this.y <= height / 2 - 180 &&
        this.y >= height / 2 - 185 &&
        this.x > users[1].x - 65 &&
        this.x <= users[1].x + 65
      ) {
        this.vy *= -1.03;
      }
      if (
        this.x >= width / 2 + 180 &&
        this.x <= width / 2 + 185 &&
        this.y > users[2].y - 65 &&
        this.y <= users[2].y + 65
      ) {
        this.vx *= -1.01;
      }
      if (
        this.x <= width / 2 - 180 &&
        this.x >= width / 2 - 185 &&
        this.y > users[3].y - 65 &&
        this.y <= users[3].y + 65
      ) {
        this.vx *= -1.04;
      }
    }

    // console.log(this.x, this.y);

    /*
    for (let i = 0; i < users.length; i++) {
      // let n = 0;
      if (users[i].id == socket.id) {
        // n = i;
        if (
          i == 0 &&
          this.y >= height / 2 + 180 &&
          this.y <= height / 2 + 185 &&
          this.x > users[i].x - 50 &&
          this.x <= users[i].x + 50
        ) {
          this.vy *= -1;
        }
        if (
          i == 1 &&
          this.y >= height / 2 - 180 &&
          this.y <= height / 2 - 185 &&
          this.x > users[i].x - 50 &&
          this.x <= users[i].x + 50
        ) {
          this.vy *= -1;
        }
      }
      // console.log("x",users[n].x-50,users[n].x+50)
      // console.log("ball",this.x)
      // if (this.y >= height/2+180 && this.y <= height/2+185 && this.x > users[n].x-50 && this.x <= users[n].x+50){
      //   this.vy *= -1;
      // }
    }*/

    // else if (this.y >= windowHeight/2+180 && this.y <= windowHeight/2+185 && this.x > myselfX-50 && this.x <= myselfX+50){
    //   this.vy *= -1;
    // }
    this.x += this.vx;
    this.y += this.vy;
  }
  display() {
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

class Me {
  constructor(x, y, r, o) {
    // this.x = myselfX;
    // this.id = data.id;
    this.x = x;
    this.y = y;
    this.r = r;
    this.id = 0;

//     this.number = 0;

//     for (let i = 0; i < users.length; i++){
//       if (users[i].id == socket.id){
//         this.number = i;
//       }
//     }
  }
  //
  leftRight() {
    if (keyIsDown(LEFT_ARROW) && this.x > 110) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - 110) {
      this.x += 5;
    }
  }
  Rightleft() {
    // console.log(users[1].x);
    if (keyIsDown(RIGHT_ARROW) && this.x > 110) {
      this.x -= 5;
    }
    if (keyIsDown(LEFT_ARROW) && this.x < width - 110) {
      this.x += 5;
    }
  }
  upDown() {
    if (keyIsDown(RIGHT_ARROW) && this.y > 110) {
      this.y -= 5;
    }
    if (keyIsDown(LEFT_ARROW) && this.y < height - 110) {
      this.y += 5;
      // console.log("height", height, "y", this.y);
    }
  }
  Downup(){
    if (keyIsDown(LEFT_ARROW) && this.y > 110) {
      this.y -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && this.y < height - 110) {
      this.y += 5;
      // console.log("height", height, "y", this.y);
    }
  }
  getId(id) {
    this.id = id;
  }
  display() {
    push();
    fill(181, 67, 44);
    noStroke();
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(this.r);
    rect(0, 0, 100, 30);
    // stroke(0);
    // line(-65, 0, 65, 0);
    pop();
  }
}

class Wall {
  constructor(x, y, r, o) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.opacity = o;
  }
  show() {
    this.opacity = 255;
  }
  hide() {
    this.opacity = 0;
  }
  display() {
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


function windowResized() {
  adjustLayout();
}
