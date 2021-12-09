const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let usernumber = [];
let roomno = 1;

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

function player(id){
  usernumber.push(id);
  // console.log("the current number of players online are: " + usernumber);
  io.emit("usernumber",usernumber);

  io.emit("getID", usernumber);
  //first player start the game
  io.emit("startpeople", usernumber[0]);
}

//general event listener for any socket connection
io.on('connection', (socket) => {
  // code inside here is per connection
  // for each connection we console log this
  player(socket.id);
  console.log('a user connected', socket.id);
  console.log('number of users:', usernumber.length);


  // socket.join("room-"+roomno);
  //  //Send this event to everyone in the room.
  //  io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
  // let connectedUsersCount = Object.keys(io.sockets.sockets).length;
  // let connectedUsersCount = io.sockets.clients().length

  //for each connection we establish an event listener
  // for when that connection disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    for(let i = usernumber.length - 1; i >= 0; i--){
      if(socket.id == usernumber[i]){
        usernumber.splice(i, 1);
        io.emit("usernumber",usernumber);
      }
    }
    console.log('number of users', usernumber.length);
  });

  socket.on('user_position', (userData)=>{
    // console.log(userData);
    io.emit('upload_position', userData);
  });

  socket.on('ball_position', (ballData)=>{
    io.emit('move_ball', ballData);
  })

  io.emit("usernumber", usernumber);
  io.emit("getID", usernumber);
  // socket.on("number", (num)=>{
  //   // console.log(num);
  //   io.emit("usernumber", usernumber);
  // });
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});
