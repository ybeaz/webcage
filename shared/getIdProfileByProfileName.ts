interface GetIdProfileByProfileNameType {
  (profiles: any[], profileName: string | undefined): string | undefined
}

/**
 * @description Function to get idProfile by profileName from profiles
 * @import import { getIdProfileByProfileName } from './shared/getIdProfileByProfileName'
 */

export const getIdProfileByProfileName: GetIdProfileByProfileNameType = (
  profiles,
  profileName
) => profiles.find(profile => profile.profileName === profileName)?.idProfile
