import { IdUserType } from '../@types/UserType'
import { EventType } from './EventType'

/**
 * @import import { MessageType } from '../@types/MessageType'
 */
export type MessageType = {
  idConversation: string
  idProfile: IdUserType
  eventType: EventType
  text: string
  idMessage: string
  createdAt: number
  position?: string
  isTail?: boolean
}
