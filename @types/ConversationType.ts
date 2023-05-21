import { ProfileType } from './ProfileType'

export type ConversationType = {
  idConversation: string
  profiles: ProfileType[]
  isActive: boolean
}
