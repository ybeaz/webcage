import { ConversationType } from '../@types/ConversationType'
import { store } from '../dataLayer/store'

const { getState, setState } = store

interface GetConversationByIdConversationType {
  (idConversation: string): ConversationType | undefined
}

/**
 * @description Function to
 * @import import { getConversationByIdConversation } from './Shared/getConversationByIdConversation'
 */
export const getConversationByIdConversation = (
  idConversation: string
): ConversationType | undefined => {
  const output = getState('conversations').find(
    (conversation: ConversationType) =>
      conversation.idConversation === idConversation
  )

  // console.info('chatHelper [64]', { conversations, idConversation, output })
  return output
}
