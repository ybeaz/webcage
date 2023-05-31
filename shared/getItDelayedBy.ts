interface GetItDelayedByType {
  (ms: number): Promise<void>
}

/**
 * @description Function to delay by number of ms
 * @import import { getItDelayedBy } from '../../../Shared/getItDelayedBy'
 */
export const getItDelayedBy: GetItDelayedByType = ms =>
  new Promise(resolve => setTimeout(resolve, ms))
