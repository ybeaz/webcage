interface GetIdProfileByProfileNameType {
  (profiles: any[], profileName: string | undefined): any
}

/**
 * @description Function to
 * @import import { getIdProfileByProfileName } from './shared/getIdProfileByProfileName'
 */

export const getIdProfileByProfileName: GetIdProfileByProfileNameType = (
  profiles,
  profileName
) => profiles.find(profile => profile.profileName === profileName)?.idProfile
