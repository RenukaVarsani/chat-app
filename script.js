const socket = io("http://localhost:3000", { transports: ["websocket"] });
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const message = document.getElementById("message-input");


var name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)


socket.on("chat-message", (data) => {
    appendMessage(`${data.name}: ${data.message}`)
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.getElementById("message-input").value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  message.value = ' ';
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
