import { ConversationType } from '../@types/ConversationType'
import { ProfileType } from '../@types/ProfileType'
import { store } from '../dataLayer/store'
import { getCurrentConversation } from './getCurrentConversation'

const { getState, setState } = store

export type GetUpdatedConversationsPropsType = {
  conversations: ConversationType[]
  idSocket: string
}

interface GetUpdatedConversationsType {
  (props: GetUpdatedConversationsPropsType): ConversationType[]
}

/**
 * @description Function to
 * @import import { getUpdatedConversations } from './getUpdatedConversations'
 */

export const getUpdatedConversations: GetUpdatedConversationsType = ({
  conversations,
  idSocket,
}) => {
  const conversation = getCurrentConversation({
    conversations,
    idSocket,
  })
  if (!conversation) return

  const indexFound = conversations.findIndex(
    (conversationIn: ConversationType) =>
      conversationIn.idConversation === conversation.idConversation
  )

  const { profiles } = conversation
  const profilesNext = profiles.map((profile: ProfileType) => {
    let output = profile
    if (profile.idSocket === idSocket) output = { ...profile }
    return output
  })

  const conversationNext = { ...conversation, profiles: profilesNext }

  let conversationsNext = [...conversations]
  conversationsNext[indexFound] = conversationNext

  return { conversations: conversationsNext }
}
