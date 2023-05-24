import { IdUserType } from '../@types/UserType'

/**
 * @import import { MessageType } from '../@types/MessageType'
 */
export type MessageType = {
  idConversation: string
  idProfile: IdUserType
  text: string
  idMessage?: string
  createdAt?: number
  position?: string
  isTail?: boolean
}
