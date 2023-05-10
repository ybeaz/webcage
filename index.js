const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./helpers/formatDate");
const {
  getUsersOfConversation,
  getExitedConversation,
  getCurrentConversation,
  newConversation,
  getActiveUser,
  exitRoom,
  newUser,
  getIndividualRoomUsers,
} = require("./helpers/userHelper");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

/**  @description Set public directory */
app.use(express.static(path.join(__dirname, "public")));

/**  @description this block will run when the client connects */
io.on("connection", (socket) => {
  socket.on("joinConversation", ({ username, respondentname, room }) => {
    const user = newUser(socket.id, username, room);
    const conversation = newConversation(socket.id, username, respondentname);

    console.info("index [26]", {
      user,
      username,
      respondentname,
      room,
      conversation,
    });

    socket.join(user.room);
    // socket.join(conversation.idConversation);

    /**  @description General welcome */
    socket.emit(
      "message",
      formatMessage("WebCage", "Messages are limited to this room! ")
    );

    /**  @description  Broadcast everytime users connects */
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("WebCage", `${user.username} has joined the room`)
      );

    /**  @description Current active users and room name */
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getIndividualRoomUsers(user.room),
    });
  });

  /**  @description Listen for client message */
  socket.on("chatMessage", (msg) => {
    const user = getActiveUser(socket.id);
    // const conversation = getCurrentConversation(socket.id)

    io.to(user.room).emit("message", formatMessage(user.username, msg));
    // io.to(conversation.idConversation).emit("message", formatMessage(conversation.username, msg));
  });

  /**  @description Runs when client disconnects */
  socket.on("disconnect", () => {
    const user = exitRoom(socket.id);
    // const conversation = getExitedConversation(socket.id)

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage("WebCage", `${user.username} has left the room`)
      );
      // io.to(conversation.idConversation).emit("message", formatMessage("WebCage", `${conversation.username} has left the room`));

      /**  @description Current active users and room name */
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getIndividualRoomUsers(user.room),
      });

      // io.to(conversation.idConversation).emit("roomUsers", {
      //   idConversation: conversation.idConversation,
      //   users: getUsersOfConversation(conversation.idConversation),
      // });
    }
  });
});

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
