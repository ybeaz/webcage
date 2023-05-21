import { ConversationType } from '../@types/ConversationType'
import { ProfileType } from '../@types/ProfileType'
import { store } from '../dataLayer/store'

const { getState, setState } = store

interface GetCurrentConversationType {
  (idSocket: string): ConversationType | undefined
}

/**
 * @description Function to
 * @import import { getCurrentConversation } from './shared/getCurrentConversation'
 */

export const getCurrentConversation: GetCurrentConversationType = function (
  idSocket
) {
  // console.info('chatHelper [71]', {
  //   conversations,
  //   profilesLen: conversations[0].profiles.length,
  //   profiles: conversations[0].profiles,
  //   idSocket,
  // })
  return getState('conversations').find(
    (conversation: ConversationType) =>
      conversation.profiles.filter(
        (profile: ProfileType) => profile.idSocket === idSocket
      ).length
  )
}
