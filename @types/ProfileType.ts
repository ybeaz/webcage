import { IdUserType } from '../@types/UserType'

export type MessengerType = {
  name: string
  profileName: string | number
}

export type ProfileType = {
  idSocket?: string
  idProfile?: string | number
  idUser?: IdUserType
  contacts?: string[]
  emails?: string[]
  locations?: string[]
  messengers?: MessengerType[]
  nameFirst?: string
  nameLast?: string
  phones?: (string | number | undefined)[]
  profileName?: string
  serviceSections?: []
  serviceSpecs?: string[]
  summary?: string
  uriAvatar?: string
}
