import { ConversationType } from '../@types/ConversationType'
import { ProfileType } from '../@types/ProfileType'
import { getCurrentConversation } from './getCurrentConversation'
import { getUpdatedConversations } from './getUpdatedConversations'

export type GetExitedConversationPropsType = {
  conversations: ConversationType[]
  idSocket: string
}

type GetExitedConversationOutputType = {
  conversation: ConversationType | undefined
  conversations: ConversationType[]
}

interface GetExitedConversationType {
  (props: GetExitedConversationPropsType): GetExitedConversationOutputType
}

/**
 * @description Function to return conversation and conversations when the user exits the conversation
 * @import import { getExitedConversation } from './Shared/getExitedConversation'
 */

export const getExitedConversation: GetExitedConversationType = ({
  conversations: conversationsIn,
  idSocket,
}) => {
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
}
