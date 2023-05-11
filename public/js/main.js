const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
const respondent = document.getElementById("respondent");

/** @description Get username and room from URL */
const { username, respondentname, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log({ username, respondentname, room });

const socket = io();

/** @description Join chatroom */
socket.emit("joinConversation", { username, respondentname, room });

/** @description Get room and users */
socket.on("conversations", ({ room, respondentname, users }) => {
  // outputRoomName(room);
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
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement("p");
  para.classList.add("text");
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector(".chat-messages").appendChild(div);
}

/** @description Add room name to DOM */
function outputRoomName(room) {
  // roomName.innerText = room;
  respondent.innerText = respondentname;
}

/** @description Add users to DOM */
function outputUsers(users) {
  console.log({ users });
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

/** @description Prompt the user before leave chat room */
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    window.location = "../index.html";
  } else {
  }
});
