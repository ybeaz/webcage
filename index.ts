const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require('cors')

import { ProfileType } from './@types/ProfileType'
import { ConversationType } from './@types/ConversationType'

import { getCurrentConversation } from './shared/getCurrentConversation'
import { getJoinedConversation } from './shared/getJoinedConversation'
import { getExitedConversation } from './shared/getExitedConversation'
import { formatMessage } from './shared/formatDate'
import { store } from './dataLayer/store'
const { getState, setState } = store

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
    const conversationsIn = getState('conversations')

    const { conversation, conversations } = getJoinedConversation({
      conversations: conversationsIn,
      idSocket: socket.id,
      profileNameHost,
      profileName,
    })
    setState({ conversations })

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
        formatMessage('WebCage', `${profileNameHost} has joined the room`)
      )

    /**  @description Current active users and room name */
    // console.info('index [70]', { conversation })
    // console.info('index [71]', { profiles: conversation.profiles })
    io.to(conversation.idConversation).emit('conversations', {
      conversation,
    })
  })

  /**  @description Listen for client message */
  socket.on('chatMessage', msg => {
    console.info('index [80]', { 'socket.id': socket.id })

    const conversation: ConversationType | undefined = getCurrentConversation(
      socket.id
    )
    const profile: ProfileType | undefined = conversation?.profiles.find(
      profile => profile.idSocket === socket.id
    )

    // console.info('index [92]', {
    //   conversation,
    //   profiles: conversation?.profiles,
    //   profile,
    //   'socket.id': socket.id,
    //   'formatMessage(profile?.profileName, msg': formatMessage(
    //     profile?.profileName,
    //     msg
    //   ),
    // })

    io.to(conversation?.idConversation).emit(
      'message',
      formatMessage(profile?.profileName, msg)
    )
  })

  /**  @description Runs when client disconnects */
  socket.on('disconnect', () => {
    console.info('index [107]', { 'socket.id': socket.id })

    const conversation = getExitedConversation(socket.id)
    const profileNameHost = conversation?.profiles.filter(
      profile => profile.idSocket === socket.id
    )

    if (conversation) {
      io.to(conversation.idConversation).emit(
        'message',
        formatMessage('WebCage', `${profileNameHost} has left the room`)
      )

      /**  @description Current active users and room name */
      io.to(conversation.idConversation).emit('conversations', {
        conversation,
      })
    }
  })
})

const PORT = process.env.PORT || 3003

server.listen(PORT, () => {
  console.log(`\n\n\n---------------------------------------------`)
  console.log(`Server running on port ${PORT}`)
  console.log(`---------------------------------------------\n\n\n`)
})
