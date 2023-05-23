import { ConversationType } from '../@types/ConversationType'
import { ProfileType } from '../@types/ProfileType'

type GetConversationsCleanedBySocketIdPropsType = {
  conversations: ConversationType[]
  idSocket: string
}

interface GetConversationsCleanedBySocketIdType {
  (props: GetConversationsCleanedBySocketIdPropsType): ConversationType[]
}

/**
 * @description Function to get next clean conversations without idSocket profiles
 * @import import { getConversationsCleanedBySocketId } from './shared/getConversationsCleanedBySocketId'
 */

export const getConversationsCleanedBySocketId: GetConversationsCleanedBySocketIdType =
  ({ conversations, idSocket }) => {
    let conversationsFiltered: ConversationType[] = []

    for (const conversation of conversations) {
      const { profiles } = conversation

      const profilesNext = profiles.filter(
        (profile: ProfileType) => profile.idSocket !== idSocket
      )
      const conversationNext = { ...conversation, profiles: profilesNext }
      conversationsFiltered = [...conversationsFiltered, conversationNext]
    }

    return conversationsFiltered
  }
