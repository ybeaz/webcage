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
 * @description Function to
 * @import import { getJoinedConversation } from '../../../Shared/getJoinedConversation'
 */

export const getJoinedConversation: GetJoinedConversationType = props => {
  const {
    conversations: conversationsIn,
    idSocket,
    profileNameHost,
    profileName,
  } = props

  // const conversations = getState('conversations')
  const idsProfiles = getSortedArray([profileNameHost, profileName])
  const idConversation = JSON.stringify(idsProfiles)

  let conversation: ConversationType | undefined = undefined

  const conversationPrev = conversationsIn.find(
    (conversation: ConversationType) =>
      conversation.idConversation === idConversation
  )

  // console.info("chatHelper [22]", conversations);
  // console.info('chatHelper [36]', {
  //   idSocket,
  //   idConversation,
  //   profileNameHost,
  //   profileName,
  //   conversationPrev,
  //   conversationsIn,
  //   conversationsLen: conversationsIn.length,
  //   '!conversationPrev?.idConversation': !conversationPrev?.idConversation,
  // })

  let caseNo = 0
  let conversationsNext: ConversationType[] = []

  if (!conversationPrev?.idConversation) {
    caseNo = 1
    conversation = {
      idConversation,
      profiles: [{ idSocket, profileName: profileNameHost }],
    }

    conversationsNext = [...conversationsIn, conversation]

    console.info('chatHelper [90]', {
      caseNo,
      idConversation,
      profiles: conversation?.profiles,
    })
  } else if (
    conversationPrev?.idConversation &&
    conversationPrev?.profiles.length === 1
  ) {
    caseNo = 2
    const { profiles } = conversationPrev

    const indexPrev = conversationsIn.findIndex(
      (conversation: ConversationType) =>
        conversation.idConversation === conversationPrev.idConversation
    )

    conversationsNext = [...conversationsIn]
    conversationsNext[indexPrev] = {
      ...conversationsIn[indexPrev],
      profiles: [...profiles, { idSocket, profileName: profileNameHost }],
    }

    conversation = conversationsNext[indexPrev]
  }

  // console.info('chatHelper [75]', {
  //   caseNo,
  //   idConversation,
  //   profiles: conversation?.profiles,
  // })
  // console.info('chatHelper [60]', conversations[0].profiles)
  // console.info('\n\n ')

  return { conversation, conversations: conversationsNext }
}
