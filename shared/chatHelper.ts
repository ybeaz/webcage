import { ConversationType } from '../@types/ConversationType'
import { ProfileType } from '../@types/ProfileType'
import { store } from '../dataLayer/store'

const { getState, setState } = store

const getSortedArray = arr => arr.sort((a, b) => a.localeCompare(b))

type GetJoinedConversationPropsType = {
  idSocket: string
  profileNameHost: string
  profileName: string
}

interface GetJoinedConversationType {
  (props: GetJoinedConversationPropsType): ConversationType | undefined
}

export const getJoinedConversation: GetJoinedConversationType = props => {
  const { idSocket, profileNameHost, profileName } = props

  const conversations = getState('conversations')
  const idsProfiles = getSortedArray([profileNameHost, profileName])
  const idConversation = JSON.stringify(idsProfiles)

  let conversation: ConversationType | undefined = undefined

  const conversationPrev = conversations.find(
    conversation => conversation.idConversation === idConversation
  )

  // console.info("chatHelper [22]", conversations);
  console.info('chatHelper [36]', {
    idConversation,
    profileNameHost,
    profileName,
    conversationPrev,
    conversations0: conversations[0],
    profiles0: conversations?.profiles,
    '!conversationPrev?.idConversation': !conversationPrev?.idConversation,
  })

  let caseNo = 0

  if (!conversationPrev?.idConversation) {
    caseNo = 1
    conversation = {
      idConversation,
      profiles: [{ idSocket, profileName: profileNameHost }],
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
      profiles: [...profiles, { idSocket, profileName: profileNameHost }],
    }
    setState({ conversations: conversationsNext })

    conversation = conversationsNext[indexPrev]
  }

  console.info('chatHelper [75]', {
    caseNo,
    idConversation,
    conversations: getState('conversations'),
    conversationsLen: conversations.length,
    profiles: conversation?.profiles,
  })
  // console.info('chatHelper [60]', conversations[0].profiles)
  // console.info('\n\n ')

  return conversation
}

export const getCurrentConversation = function (
  idSocket: string
): ConversationType | undefined {
  // console.info('chatHelper [71]', {
  //   conversations,
  //   profilesLen: conversations[0].profiles.length,
  //   profiles: conversations[0].profiles,
  //   idSocket,
  // })
  return getState('conversations').find(conversation =>
    conversation.profiles.filter(
      (profile: ProfileType) => profile.idSocket === idSocket
    )
  )
}

export function getExitedConversation(idSocket: string) {
  const conversation = getState('conversations').find(conversation =>
    conversation.profiles.filter(
      (profile: ProfileType) => profile.idSocket === idSocket
    )
  )

  const conversationsNext = getState('conversations').filter(
    conversation =>
      !conversation.profiles.filter(profile => profile.idSocket === idSocket)
  )
  setState({ conversations: conversationsNext })

  return conversation
}

export function getConversationByIdConversation(
  idConversation: string
): ConversationType | undefined {
  const output = getState('conversations').find(
    conversation => conversation.idConversation === idConversation
  )

  // console.info('chatHelper [64]', { conversations, idConversation, output })
  return output
}
