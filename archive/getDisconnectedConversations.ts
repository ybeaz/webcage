import { ConversationType } from '../@types/ConversationType'
import { ProfileType } from '../@types/ProfileType'
import { getConversationsBySocketIdProfilesLtd } from './getConversationsBySocketIdProfilesLtd'

export type GetDisconnectedConversationsPropsType = {
  conversations: ConversationType[]
  idSocket: string
}

type GetDisconnectedConversationsOutputType = {
  conversationsDisconnected: ConversationType[]
  conversations: ConversationType[]
}

interface GetDisconnectedConversationsType {
  (
    props: GetDisconnectedConversationsPropsType
  ): GetDisconnectedConversationsOutputType
}

/**
 * @description Function to return conversation and conversations when the user exits the conversation
 * @import import { getDisconnectedConversations } from './Shared/getDisconnectedConversations'
 */

export const getDisconnectedConversations: GetDisconnectedConversationsType = ({
  conversations: conversationsIn,
  idSocket,
}) => {
  const conversationsToExit = getConversationsBySocketIdProfilesLtd({
    conversations: conversationsIn,
    idSocket,
  })

  return { conversationsDisconnected: [], conversations: [] }
}

/*

  const conversation = getCurrentConversation({
    conversations: conversationsIn,
    idSocket,
  })
  if (!conversation)
    return { conversation: undefined, conversations: conversationsIn }

  const indexFound = conversationsIn.findIndex(
    (conversationIn: ConversationType) =>
      conversationIn.idConversation === conversation.idConversation
  )

  const { profiles } = conversation
  const profilesNext = profiles.filter(
    (profile: ProfileType) => profile.idSocket !== idSocket
  )

  const conversationNext = { ...conversation, profiles: profilesNext }

  let conversationsNext = [...conversationsIn]
  conversationsNext[indexFound] = conversationNext

  return { conversation: conversationNext, conversations: conversationsNext }

*/
