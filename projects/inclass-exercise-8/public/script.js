let socket = io();

let form = document.getElementById('form');
let input = document.getElementById('input');
let message = element.getElementById('messages');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log(input.value);
  if (input.value) {
    socket.emit('chatMessage', input.value);
    input.value = '';
  }
});
