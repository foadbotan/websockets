import socket from './socket.js';
import btn from './components/btn.js';

const messagesList = document.getElementById('message-list');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message');
const roomForm = document.getElementById('room-form');
const roomInput = document.getElementById('room');
const roomDisplay = document.getElementById('room-display');

messageForm.after(btn);

// set the default room to 'main room'
setRoom("Foad's room");

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (messageInput.value) {
    console.log(`----- room: ${roomDisplay.textContent} -----`);
    socket.emit('chat message', messageInput.value, roomDisplay.textContent);
    messageInput.value = '';
  }
});

roomForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (roomInput.value) {
    setRoom(roomInput.value);
  }
});

socket.on('chat message', function (msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messagesList.appendChild(item);
});

function setRoom(room) {
  roomDisplay.textContent = room;
  roomInput.value = '';
  socket.emit('join room', room);
}
