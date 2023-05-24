interface GetItDelayedByType {
  (ms: number): Promise<void>
}

/**
 * @description Function to
 * @import import { getItDelayedBy } from '../../../Shared/getItDelayedBy'
 */
export const getItDelayedBy: GetItDelayedByType = ms =>
  new Promise(resolve => setTimeout(resolve, ms))
