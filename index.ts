import path from 'path'
import http from 'http'
import express from 'express'
import { Server } from 'socket.io'
import { nanoid } from 'nanoid'

import { ProfileType } from './@types/ProfileType'
import { ConversationType } from './@types/ConversationType'
import { MessageType } from './@types/MessageType'

import { getIdProfileByProfileName } from './shared/getIdProfileByProfileName'
import { getJoinedConversation } from './shared/getJoinedConversation'
import { getConversationsBySocketIdProfilesLtd } from './shared/getConversationsBySocketIdProfilesLtd'
import { getConversationsCleanedBySocketId } from './shared/getConversationsCleanedBySocketId'

import { profiles } from './ContentMock/profilesMock'

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

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**  @description this block will run when the client connects */
io.on('connection', (socket: any) => {
  // console.info("index [28]", { socket });

  socket.on('joinConversation', async ({ profileNameHost, profileName }) => {
    // await delay(100)

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
    const { idConversation } = conversation
    const text = 'Messages are limited to this room!'
    let idMessage = nanoid()
    const message: MessageType = {
      idMessage,
      idConversation,
      idProfile: '',
      text,
      createdAt: +new Date(),
    }
    socket.emit('message', message)

    /**  @description  Broadcast everytime users connects */
    idMessage = nanoid()
    const message2: MessageType = {
      idMessage,
      idConversation,
      idProfile: profileNameHost,
      text: `WebCage ${profileNameHost} has joined the room`,
      createdAt: +new Date(),
    }
    socket.broadcast.to(idConversation).emit('message', message2)

    console.info('index [88]')
    console.dir({ conversationsIn: getState('conversations') }, optionsDir)
    /**  @description Current active users and room name */
    io.to(idConversation).emit('conversations', {
      conversation,
    })
  })

  /**  @description Listen for client message */
  socket.on('chatMessage', (chatMessage: MessageType) => {
    const conversationsIn = getState('conversations')
    const { idConversation, idProfile, text } = chatMessage
    const idMessage = nanoid()
    const message3: MessageType = {
      idMessage,
      idConversation,
      idProfile,
      text,
      createdAt: +new Date(),
    }
    console.info('index [80]', { text, 'socket.id': socket.id })

    io.to(idConversation).emit('message', message3)
  })

  /**  @description Runs when client disconnects */
  socket.on('disconnect', () => {
    const conversationsIn = getState('conversations')

    const conversationsDisconnected = getConversationsBySocketIdProfilesLtd({
      conversations: conversationsIn,
      idSocket: socket.id,
    })

    const conversations = getConversationsCleanedBySocketId({
      conversations: conversationsIn,
      idSocket: socket.id,
    })
    setState({ conversations })

    console.log('index [140]')
    console.dir(
      {
        idSocket: socket.id,
      },
      optionsDir
    )

    if (conversationsDisconnected.length) {
      conversationsDisconnected.forEach((conversation: ConversationType) => {
        const { idConversation, profiles } = conversation
        const { profileName } = profiles[0]
        const idProfile = getIdProfileByProfileName(profiles, profileName)
        const idMessage = nanoid()
        const message4: MessageType = {
          idMessage,
          idConversation,
          idProfile,
          text: `${profileName} has left the room`,
          createdAt: +new Date(),
        }
        io.to(idConversation).emit('message', message4)
      })

      // /**  @description Current active users and room name */
      // io.to(conversation.idConversation).emit('conversations', {
      //   conversation,
      // })
    }
  })
})

const PORT = process.env.PORT || 3003

server.listen(PORT, () => {
  console.log(`\n\n\n---------------------------------------------`)
  console.log(`Server running on port ${PORT}`)
  console.log(`---------------------------------------------\n\n\n`)
})
