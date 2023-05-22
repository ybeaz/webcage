import path from 'path'
import http from 'http'
import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'

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

const optionsDir = {
  showHidden: true,
  depth: null,
  showPrototypes: true,
}

/**
 * @link https://stackoverflow.com/questions/59749021/socket-io-error-access-to-xmlhttprequest-has-been-blocked-by-cors-policy
 */
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

/**  @description Set public directory */
app.use(express.static(path.join(__dirname, 'public')))

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**  @description this block will run when the client connects */
io.on('connection', (socket: any) => {
  // console.info("index [28]", { socket });

  socket.on('joinConversation', async ({ profileNameHost, profileName }) => {
    await delay(100)

    const conversationsIn = getState('conversations')

    const { conversation, conversations } = getJoinedConversation({
      conversations: conversationsIn,
      idSocket: socket.id,
      profileNameHost,
      profileName,
    })
    setState({ conversations })

    // console.info('\n\n', 'index [55] Join')
    // console.dir(
    //   {
    //     conversation,
    //     conversationsIn,
    //     conversations,
    //     idSocket: socket.id,
    //     profileNameHost,
    //     profileName,
    //   },
    //   optionsDir
    // )

    if (!conversation) return

    await socket.join(conversation.idConversation)

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
    io.to(conversation.idConversation).emit('conversations', {
      conversation,
    })
  })

  /**  @description Listen for client message */
  socket.on('chatMessage', msg => {
    const conversationsIn = getState('conversations')

    console.info('index [80]', { msg, 'socket.id': socket.id })

    const conversation: ConversationType | undefined = getCurrentConversation({
      conversations: conversationsIn,
      idSocket: socket.id,
    })
    const profile: ProfileType | undefined = conversation?.profiles.find(
      profile => profile.idSocket === socket.id
    )

    if (conversation?.idConversation)
      io.to(conversation.idConversation).emit(
        'message',
        formatMessage(profile?.profileName, msg)
      )
  })

  /**  @description Runs when client disconnects */
  socket.on('disconnect', () => {
    const conversationsIn = getState('conversations')

    const exitedConversation = getExitedConversation({
      conversations: conversationsIn,
      idSocket: socket.id,
    })

    // console.info('\n\n', 'index [130] Exit')
    // console.dir(
    //   { 'socket.id': socket.id, conversationsIn, exitedConversation },
    //   optionsDir
    // )

    if (!exitedConversation) return

    const { conversation, conversations } = exitedConversation

    setState({ conversations })

    const profileNameHost = conversation?.profiles.filter(
      (profile: ProfileType) => profile.idSocket === socket.id
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
