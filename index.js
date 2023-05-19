const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const formatMessage = require("./helpers/formatDate");
const {
  getConversationsByIdConversation,
  getExitedConversation,
  getCurrentConversation,
  getAddedConversation,
} = require("./helpers/chatHelper");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

/**  @description Set public directory */
app.use(express.static(path.join(__dirname, "public")));

/**  @description this block will run when the client connects */
io.on("connection", (socket) => {
  // console.info("index [28]", { socket });

  socket.on("joinConversation", ({ profileName, respondentname }) => {
    const conversation = getAddedConversation({
      idSocket: socket.id,
      profileName,
      respondentname,
    });

    console.info("index [26]", {
      conversationsById: getConversationsByIdConversation(
        conversation.idConversation
      ),
      profileName,
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
        formatMessage(
          "WebCage",
          `${conversation.profileName} has joined the room`
        )
      );

    /**  @description Current active users and room name */
    io.to(conversation.idConversation).emit("conversations", {
      idConversation: conversation.idConversation,
      users: getConversationsByIdConversation(conversation.idConversation),
    });
  });

  /**  @description Listen for client message */
  socket.on("chatMessage", (msg) => {
    const conversation = getCurrentConversation(socket.id);

    io.to(conversation.idConversation).emit(
      "message",
      formatMessage(conversation.profileName, msg)
    );
  });

  /**  @description Runs when client disconnects */
  socket.on("disconnect", () => {
    const conversation = getExitedConversation(socket.id);

    if (conversation) {
      io.to(conversation.idConversation).emit(
        "message",
        formatMessage(
          "WebCage",
          `${conversation.profileName} has left the room`
        )
      );

      /**  @description Current active users and room name */

      io.to(conversation.idConversation).emit("conversations", {
        idConversation: conversation.idConversation,
        users: getConversationsByIdConversation(conversation.idConversation),
      });
    }
  });
});

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
