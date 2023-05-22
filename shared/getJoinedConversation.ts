import { ConversationType } from '../@types/ConversationType'
import { ProfileType } from '../@types/ProfileType'
import { getSortedArray } from './getSortedArray'

type GetJoinedConversationPropsType = {
  conversations: ConversationType[]
  idSocket: string
  profileNameHost: string
  profileName: string
}

interface GetJoinedConversationType {
  (props: GetJoinedConversationPropsType): {
    conversation: ConversationType | undefined
    conversations: ConversationType[]
  }
}

/**
 * @description Function to return conversation and conversations when the user joins the conversation
 * @import import { getJoinedConversation } from '../../../Shared/getJoinedConversation'
 */

export const getJoinedConversation: GetJoinedConversationType = props => {
  const {
    conversations: conversationsIn,
    idSocket,
    profileNameHost,
    profileName,
  } = props

  const idsProfiles = getSortedArray([profileNameHost, profileName])
  const idConversation = JSON.stringify(idsProfiles)

  let conversation: ConversationType | undefined = undefined

  const conversationPrev = conversationsIn.find(
    (conversation: ConversationType) =>
      conversation.idConversation === idConversation
  )

  let caseNo = 0
  let conversationsNext: ConversationType[] = []

  if (!conversationPrev?.idConversation) {
    caseNo = 1
    conversation = {
      idConversation,
      profiles: [{ idSocket, profileName: profileNameHost }],
    }

    conversationsNext = [...conversationsIn, conversation]
  } else if (conversationPrev?.idConversation) {
    caseNo = 2
    const { profiles } = conversationPrev

    const indexPrev = conversationsIn.findIndex(
      (conversation: ConversationType) =>
        conversation.idConversation === conversationPrev.idConversation
    )

    conversationsNext = [...conversationsIn]

    const profilesTemp = profiles.filter(
      (profile: ProfileType) => profile.profileName !== profileNameHost
    )
    const profilesNext = [
      ...profilesTemp,
      { idSocket, profileName: profileNameHost },
    ]

    conversationsNext[indexPrev] = {
      ...conversationsIn[indexPrev],
      profiles: profilesNext,
    }

    conversation = conversationsNext[indexPrev]
  }

  return { conversation, conversations: conversationsNext }
}
