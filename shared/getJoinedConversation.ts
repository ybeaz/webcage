import { ConversationType } from '../@types/ConversationType'
import { ProfileType } from '../@types/ProfileType'
import { store } from '../dataLayer/store'
import { getSortedArray } from './getSortedArray'

const { getState, setState } = store

type GetJoinedConversationPropsType = {
  idSocket: string
  profileNameHost: string
  profileName: string
}

interface GetJoinedConversationType {
  (props: GetJoinedConversationPropsType): ConversationType | undefined
}

/**
 * @description Function to
 * @import import { getJoinedConversation } from '../../../Shared/getJoinedConversation'
 */

export const getJoinedConversation: GetJoinedConversationType = props => {
  const { idSocket, profileNameHost, profileName } = props

  const conversations = getState('conversations')
  const idsProfiles = getSortedArray([profileNameHost, profileName])
  const idConversation = JSON.stringify(idsProfiles)

  let conversation: ConversationType | undefined = undefined

  const conversationPrev = conversations.find(
    (conversation: ConversationType) =>
      conversation.idConversation === idConversation
  )

  // console.info("chatHelper [22]", conversations);
  console.info('chatHelper [36]', {
    idSocket,
    idConversation,
    profileNameHost,
    profileName,
    conversationPrev,
    conversations,
    conversationsLen: conversations.length,
    conversations0: conversations[0],
    profiles0: conversations?.profiles,
    '!conversationPrev?.idConversation': !conversationPrev?.idConversation,
  })

  let caseNo = 0

  if (!conversationPrev?.idConversation) {
    caseNo = 1
    conversation = {
      idConversation,
      profiles: [{ idSocket, profileName: profileNameHost, isActive: true }],
      isActive: true,
    }
    setState({ conversations: [...conversations, conversation] })
  } else if (
    conversationPrev?.idConversation &&
    conversationPrev?.profiles.length === 1
  ) {
    caseNo = 2
    const { profiles } = conversationPrev

    const indexPrev = conversations.findIndex(
      (conversation: ConversationType) =>
        conversation.idConversation === conversationPrev.idConversation
    )

    const conversationsNext = [...conversations]
    conversationsNext[indexPrev] = {
      ...conversations[indexPrev],
      profiles: [
        ...profiles,
        { idSocket, profileName: profileNameHost, isActive: true },
      ],
    }
    setState({ conversations: conversationsNext })

    conversation = conversationsNext[indexPrev]
  }

  console.info('chatHelper [75]', {
    caseNo,
    idConversation,
    conversations: getState('conversations'),
    conversationsLen: getState('conversations').length,
    profiles: conversation?.profiles,
  })
  // console.info('chatHelper [60]', conversations[0].profiles)
  // console.info('\n\n ')

  return conversation
}
