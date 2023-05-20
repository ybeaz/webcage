const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const userList = document.getElementById("users");
const respondent = document.getElementById("respondent");

/*
• io.of(namespace): Creates a separate namespace for Socket.IO connections.
• io.on(eventName, callback): Listens for a specific event on the server side.
• io.sockets.emit(eventName, data): Emits an event to all connected clients.
• io.to(roomName).emit(eventName, data): Sends an event to all clients in a specific room.
• io.use(middleware): Registers a middleware function to be executed for every incoming connection.
• socket.broadcast.emit(eventName, data): Emits an event to all clients except the current one.
• socket.disconnect(): Disconnects the client from the server.
• socket.emit(eventName, data): Emits an event from the server to a specific client or clients.
• socket.id: Returns the unique identifier for the client's socket connection.
• socket.join(roomName): Makes a client join a specific room.
• socket.leave(roomName): Makes a client leave a specific room.
• socket.on(eventName, callback): Listens for a specific event on the client side.
*/

/** @description Get profileNameHost and from URL */
const { profileNameHost, respondentname } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.info("main [11]", { profileNameHost, respondentname });

const socket = io("http://localhost:3003");

/** @description Join chatroom */
socket.emit("joinConversation", { profileNameHost, respondentname });

/** @description Get users */
socket.on("conversations", (socket) => {
  const { users } = socket;
  console.info("main [20]", { users, socket });
  outputUsers(users);
});

/** @description Message from server */
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  /** @description Scroll down */
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

/** @description Message submit */
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  /** @description Get message text */
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  /** @description Emit message to server */
  socket.emit("chatMessage", msg);

  /** @description Clear input */
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

/** @description Output message to DOM */
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.profileNameHost;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);
}

/** @description Add name to DOM */
function outputRoomName() {
  respondent.innerText = respondentname;
}

/** @description Add users to DOM */
function outputUsers(users) {
  console.log({ users });
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.profileNameHost;
    userList.appendChild(li);
  });
}

/** @description Prompt the user before leave chat */
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    window.location = "../index.html";
  } else {
  }
});
