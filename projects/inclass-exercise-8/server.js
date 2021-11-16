const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  /////////
  console.log('a user connected', socket.id);

  socket.on('chatMessage', (msg) => {
    console.log("message", msg);
    io.emit("messageFromSomeone", msg);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });

  // socket.on("disconnect")
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// const express = require('express');
// const app = express();//handle routes
// const http = require('http');//...knows how to talk http protocol
// const server = http.createServer(app);
// const { Server } = require("socket.io");//...knows how to speak websocket
// const io = new Server(server);//create socket server that builds on top of http server
// // const port = 3000;
//
// app.use(express.static('public'));
//
// // app.get('/', (req, res) => {
// //   res.send('<h1>Hello world!</h1>');
// // });
//
// io.on('connection', (socket) => {
//   console.log('a user connected');
// });
//
// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });
