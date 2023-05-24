import { ConversationType } from '../@types/ConversationType'
import { ProfileType } from '../@types/ProfileType'

type GetConversationsBySocketIdPropsType = {
  conversations: ConversationType[]
  idSocket: string
}

interface GetConversationsBySocketIdType {
  (props: GetConversationsBySocketIdPropsType): ConversationType[]
}

/**
 * @description Function to get conversation with profiles that contains a specific idSocket
 * @import import { getConversationsBySocketId } from './shared/getConversationsBySocketId'
 */

export const getConversationsBySocketId: GetConversationsBySocketIdType = ({
  conversations,
  idSocket,
}) => {
  let conversationsFiltered: ConversationType[] = []

  for (const conversation of conversations) {
    const { profiles } = conversation
    for (const profile of profiles) {
      if (profile.idSocket === idSocket) {
        conversationsFiltered = [...conversationsFiltered, conversation]
        break
      }
    }
  }

  return conversationsFiltered
}
