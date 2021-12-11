const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT;

let usernumber = [];

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
  // let connectedUsersCount = Object.keys(io.sockets.sockets).length;
  // let connectedUsersCount = io.sockets.clients().length

  // if (usernumber.length <= 4){
  //   socket.join("room1");
  //   io.to("room1").emit('connectToRoom', "you're in room1");
  // }

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


    // changed this line:
    // io.emit('upload_position', userData);
    // to this line:
    socket.broadcast.emit('upload_position', userData);
    // see difference: https://socket.io/docs/v4/emit-cheatsheet/

  });

  socket.on('ball_position', (ballData)=>{
    socket.broadcast.emit('move_ball', ballData);
  })

  socket.on("clear", (none)=>{
    socket.broadcast.emit("clearCan", "none");
  })
  io.emit("usernumber", usernumber);
  io.emit("getID", usernumber);
  // socket.on("number", (num)=>{
  //   // console.log(num);
  //   io.emit("usernumber", usernumber);
  // });
});



server.listen(port, () => {
  console.log('listening on *:${port}');
});
