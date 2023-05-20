import { ConversationType } from '../@types/ConversationType'

let conversations: ConversationType[] =
  [] /** @example [{ idConversation: '["@rome","@smid"]', profiles: [Array] }] */

const getSortedArray = arr => arr.sort((a, b) => a.localeCompare(b))

const getFoundElementBy = (arr, propName, value) => {
  const profileFound = arr(profile => profile[propName] === value)
  return profileFound
}

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

  const idsProfiles = getSortedArray([profileNameHost, profileName])
  const idConversation = JSON.stringify(idsProfiles)
  let conversation: ConversationType | undefined = undefined

  const conversationPrev = conversations.find(
    conversation => conversation.idConversation === idConversation
  )

  // console.info("chatHelper [22]", conversations);
  console.info('chatHelper [23]', {
    idConversation,
    profileNameHost,
    profileName,
    conversationPrev,
  })

  if (
    !conversationPrev?.idConversation ||
    conversationPrev.profileNameHost !== profileNameHost
  ) {
    conversation = {
      idConversation,
      idsSockets: [],
      idsProfiles,
      idSocket,
      profileNameHost,
      profileName,
    }
    conversations = [...conversations, conversation]
  }

  return conversation
}

export const getCurrentConversation = function (
  idSocket: string
): ConversationType | undefined {
  return conversations.find(conversation => conversation.idSocket === idSocket)
}

export function getExitedConversation(idSocket: string) {
  const conversation = conversations.find(
    conversation => conversation.idSocket === idSocket
  )
  conversations = conversations.filter(
    conversation => conversation.idSocket !== idSocket
  )

  return conversation
}

export function getConversationsByIdConversation(idConversation: string) {
  const output = conversations.filter(
    conversation => conversation.idConversation === idConversation
  )

  // console.info("chatHelper [64]", { conversations });
  return output
}

// module.exports = {
//   getConversationsByIdConversation,
//   getExitedConversation,
//   getCurrentConversation,
//   getJoinedConversation,
// }
