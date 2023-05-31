import { Server } from 'socket.io'
import { nanoid } from 'nanoid'

import { ConversationType } from '../@types/ConversationType'
import { MessageType } from '../@types/MessageType'

import { getIdProfileByProfileName } from './getIdProfileByProfileName'
import { getJoinedConversation } from './getJoinedConversation'
import { getConversationsBySocketIdProfilesLtd } from './getConversationsBySocketIdProfilesLtd'
import { getConversationsCleanedBySocketId } from './getConversationsCleanedBySocketId'
import { store } from '../dataLayer/store'
import { EventType } from '../@types/EventType'
const { getState, setState } = store

interface GetConnectedOnType {
  (io: Server): void
}

/**
 * @description Function to
 * @import import { getConnectedOn } from './shared/getConnectedOn'
 */

export const getConnectedOn: GetConnectedOnType = io => {
  io.on('connection', (socket: any) => {
    socket.on('joinConversation', async ({ idProfileHost, idProfile }) => {
      const conversationsIn = getState('conversations')

      const { conversation, conversations } = getJoinedConversation({
        conversations: conversationsIn,
        idSocket: socket.id,
        idProfileHost,
        idProfile,
      })
      setState({ conversations })

      if (!conversation) return

      await socket.join(conversation.idConversation)

      /**  @description General welcome */
      const { idConversation } = conversation
      const text = 'Messages are limited to this conversation!'
      let idMessage = nanoid()
      const message: MessageType = {
        idMessage,
        idConversation,
        idProfile: '',
        eventType: EventType['joinConversation'],
        text,
        createdAt: +new Date(),
      }
      socket.emit('message', message)

      /**  @description  Broadcast everytime users connects */
      idMessage = nanoid()
      const message2: MessageType = {
        idMessage,
        idConversation,
        idProfile,
        eventType: EventType['joinConversation'],
        text: `user with id ${idProfileHost} has joined`,
        createdAt: +new Date(),
      }
      socket.broadcast.to(idConversation).emit('message', message2)

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
        eventType: EventType['chatMessage'],
        text,
        createdAt: +new Date(),
      }
      console.info('index [80]', {
        text,
        'socket.id': socket.id,
        eventType: message3.eventType,
      })

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

      if (conversationsDisconnected.length) {
        conversationsDisconnected.forEach((conversation: ConversationType) => {
          const { idConversation, profiles } = conversation
          const { idProfile } = profiles[0]
          const idMessage = nanoid()
          const message4: MessageType = {
            idMessage,
            idConversation,
            idProfile,
            eventType: EventType['disconnectConversation'],
            text: `${idProfile} has left`,
            createdAt: +new Date(),
          }
          io.to(idConversation).emit('message', message4)
        })
      }
    })
  })
}
