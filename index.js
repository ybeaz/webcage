const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./helpers/formatDate");
const {
  getConversationsByIdConversation,
  getExitedConversation,
  getCurrentConversation,
  newConversation,
} = require("./helpers/userHelper");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

/**  @description Set public directory */
app.use(express.static(path.join(__dirname, "public")));

/**  @description this block will run when the client connects */
io.on("connection", (socket) => {
  socket.on("joinConversation", ({ username, respondentname, room }) => {
    const conversation = newConversation(socket.id, username, respondentname);

    console.info("index [26]", {
      conversationsById: getConversationsByIdConversation(
        conversation.idConversation
      ),
      username,
      respondentname,
      conversation,
    });

    socket.join(conversation.idConversation);

    /**  @description General welcome */
    socket.emit(
      "message",
      formatMessage("WebCage", "Messages are limited to this room! ")
    );

    /**  @description  Broadcast everytime users connects */
    socket.broadcast
      .to(conversation.idConversation)
      .emit(
        "message",
        formatMessage("WebCage", `${conversation.username} has joined the room`)
      );

    /**  @description Current active users and room name */
    io.to(conversation.idConversation).emit("roomUsers", {
      idConversation: conversation.idConversation,
      users: getConversationsByIdConversation(conversation.idConversation),
    });
  });

  /**  @description Listen for client message */
  socket.on("chatMessage", (msg) => {
    const conversation = getCurrentConversation(socket.id);

    io.to(conversation.idConversation).emit(
      "message",
      formatMessage(conversation.username, msg)
    );
  });

  /**  @description Runs when client disconnects */
  socket.on("disconnect", () => {
    const conversation = getExitedConversation(socket.id);

    if (conversation) {
      io.to(conversation.idConversation).emit(
        "message",
        formatMessage("WebCage", `${conversation.username} has left the room`)
      );

      /**  @description Current active users and room name */

      io.to(conversation.idConversation).emit("roomUsers", {
        idConversation: conversation.idConversation,
        users: getConversationsByIdConversation(conversation.idConversation),
      });
    }
  });
});

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
