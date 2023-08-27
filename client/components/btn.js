import socket from '../socket.js';

const btn = document.createElement('btn');
btn.textContent = 'Click me!';

btn.addEventListener('click', () => {
  socket.emit('chat message', 'Hello world!');
  socket.emit('btn', 'btn clicked!');
});

socket.on('btn', (msg) => {
  console.log(msg);
});

export default btn;
