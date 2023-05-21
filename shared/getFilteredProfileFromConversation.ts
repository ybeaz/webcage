import { ConversationType } from '../@types/ConversationType'
import { ProfileType } from '../@types/ProfileType'

interface GetFilteredProfileFromConversationType {
  (conversation: ConversationType | undefined, idSocket: string):
    | ConversationType
    | undefined
}

/**
 * @description Function to remove a profile from conversation by idSocket
 * @import import { getFilteredProfileFromConversation } from './Shared/getFilteredProfileFromConversation'
 */
export const getFilteredProfileFromConversation: GetFilteredProfileFromConversationType =
  (conversation, idSocket): ConversationType | undefined => {
    if (!conversation) return

    const { profiles } = conversation
    const profilesNext = profiles.filter(
      (profile: ProfileType) => profile.idSocket !== idSocket
    )

    return { ...conversation, profiles: profilesNext }
  }
