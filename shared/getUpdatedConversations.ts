import { ConversationType } from '../@types/ConversationType'
import { ProfileType } from '../@types/ProfileType'
import { store } from '../dataLayer/store'
import { getCurrentConversation } from './getCurrentConversation'

const { getState, setState } = store

interface GetUpdatedConversationsType {
  (idSocket: string): void
}

/**
 * @description Function to
 * @import import { getUpdatedConversations } from './getUpdatedConversations'
 */

export const getUpdatedConversations: GetUpdatedConversationsType =
  idSocket => {
    const conversation = getCurrentConversation(idSocket)
    if (!conversation) return

    const conversations = getState('conversations')

    const indexFound = conversations.findIndex(
      (conversationIn: ConversationType) =>
        conversationIn.idConversation === conversation.idConversation
    )

    const { profiles } = conversation
    const profilesNext = profiles.map((profile: ProfileType) => {
      let output = profile
      if (profile.idSocket === idSocket)
        output = { ...profile, isActive: false }
      return output
    })

    const conversationNext = { ...conversation, profiles: profilesNext }

    let conversationsNext = [...conversations]
    conversationsNext[indexFound] = conversationNext

    setState({ conversations: conversationsNext })
  }
