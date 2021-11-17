const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let usernumber = [];
// let userID = [];

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

function player(id){
  usernumber.push(id);
  io.emit("usernumber",usernumber);
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
  socket.on("number", (num)=>{
    console.log(num);
    io.emit("usernumber", usernumber);
  });
  // socket.on("emoji1", (click1)=>{
  //   io.emit("pushnum1", click1);
  // })
  // socket.on("emoji2", (click2)=>{
  //   io.emit("pushnum2", click2);
  // })
  // socket.on("emoji3", (click3)=>{
  //   io.emit("pushnum3", click3);
  // })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
