import { ConversationType } from '../@types/ConversationType'
import { getCurrentConversation } from './getCurrentConversation'
import { getUpdatedConversations } from './getUpdatedConversations'

interface GetExitedConversationType {
  (idSocket: string): ConversationType | undefined
}

/**
 * @description Function to
 * @import import { getExitedConversation } from './Shared/getExitedConversation'
 */

export const getExitedConversation: GetExitedConversationType = idSocket => {
  const conversation = getCurrentConversation(idSocket)
  // const conversationNext = getRemovedProfileFromConversation(
  //   conversation,
  //   idSocket
  // )
  getUpdatedConversations(idSocket)

  // setState({ conversations: conversationsNext })

  return conversation
}
