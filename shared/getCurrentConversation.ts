import { ConversationType } from '../@types/ConversationType'
import { ProfileType } from '../@types/ProfileType'

export type GetCurrentConversationPropsType = {
  conversations: ConversationType[]
  idSocket: string
}

interface GetCurrentConversationType {
  (props: GetCurrentConversationPropsType): ConversationType | undefined
}

/**
 * @description Function to
 * @import import { getCurrentConversation } from './shared/getCurrentConversation'
 */
export const getCurrentConversation: GetCurrentConversationType = function ({
  conversations,
  idSocket,
}) {
  return conversations.find(
    (conversation: ConversationType) =>
      conversation.profiles.filter(
        (profile: ProfileType) => profile.idSocket === idSocket
      ).length
  )
}
