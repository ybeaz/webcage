const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

import { ConversationType } from './@types/ConversationType'
import { formatMessage } from './shared/formatDate'
import {
  getConversationsByIdConversation,
  getExitedConversation,
  getCurrentConversation,
  getJoinedConversation,
} from './shared/chatHelper'

const app = express()
const server = http.createServer(app)

/**
 * @link https://stackoverflow.com/questions/59749021/socket-io-error-access-to-xmlhttprequest-has-been-blocked-by-cors-policy
 */
const io = socketio(server, {
  cors: {
    origin: '*',
  },
})

/**  @description Set public directory */
app.use(express.static(path.join(__dirname, 'public')))

/**  @description this block will run when the client connects */
io.on('connection', socket => {
  // console.info("index [28]", { socket });

  socket.on('joinConversation', ({ profileNameHost, profileName }) => {
    const conversation = getJoinedConversation({
      idSocket: socket.id,
      profileNameHost,
      profileName,
    })

    if (!conversation) return

    // console.info("index [26]", {
    //   // conversationsById: getConversationsByIdConversation(
    //   //   conversation.idConversation
    //   // ),
    //   profileNameHost,
    //   profileName,
    //   conversation,
    // });

    socket.join(conversation.idConversation)

    /**  @description General welcome */
    socket.emit(
      'message',
      formatMessage('WebCage', 'Messages are limited to this room! ')
    )

    /**  @description  Broadcast everytime users connects */
    socket.broadcast
      .to(conversation.idConversation)
      .emit(
        'message',
        formatMessage(
          'WebCage',
          `${conversation.profileNameHost} has joined the room`
        )
      )

    /**  @description Current active users and room name */
    io.to(conversation.idConversation).emit('conversations', {
      idConversation: conversation.idConversation,
      users: getConversationsByIdConversation(conversation.idConversation),
    })
  })

  /**  @description Listen for client message */
  socket.on('chatMessage', msg => {
    const conversation: ConversationType | undefined = getCurrentConversation(
      socket.id
    )

    io.to(conversation?.idConversation).emit(
      'message',
      formatMessage(conversation?.profileNameHost, msg)
    )
  })

  /**  @description Runs when client disconnects */
  socket.on('disconnect', () => {
    const conversation = getExitedConversation(socket.id)

    if (conversation) {
      io.to(conversation.idConversation).emit(
        'message',
        formatMessage(
          'WebCage',
          `${conversation.profileNameHost} has left the room`
        )
      )

      /**  @description Current active users and room name */

      io.to(conversation.idConversation).emit('conversations', {
        idConversation: conversation.idConversation,
        users: getConversationsByIdConversation(conversation.idConversation),
      })
    }
  })
})

const PORT = process.env.PORT || 3003

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
