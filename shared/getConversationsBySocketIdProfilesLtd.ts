import { ConversationType } from '../@types/ConversationType'
import { ProfileType } from '../@types/ProfileType'

type GetConversationsBySocketIdProfilesLtdPropsType = {
  conversations: ConversationType[]
  idSocket: string
}

interface GetConversationsBySocketIdProfilesLtdType {
  (props: GetConversationsBySocketIdProfilesLtdPropsType): ConversationType[]
}

/**
 * @description Function to get conversations with profiles that contains a specific idSocket
 * @import import { getConversationsBySocketIdProfilesLtd } from './shared/getConversationsBySocketIdProfilesLtd'
 */

export const getConversationsBySocketIdProfilesLtd: GetConversationsBySocketIdProfilesLtdType =
  ({ conversations, idSocket }) => {
    let conversationsFiltered: ConversationType[] = []

    for (const conversation of conversations) {
      const { profiles } = conversation
      for (const profile of profiles) {
        if (profile.idSocket === idSocket) {
          const profilesNext = profiles.filter(
            (profile: ProfileType) => profile.idSocket === idSocket
          )
          const conversationNext = { ...conversation, profiles: profilesNext }
          conversationsFiltered = [...conversationsFiltered, conversationNext]
          break
        }
      }
    }

    return conversationsFiltered
  }
