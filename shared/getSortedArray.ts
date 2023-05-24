interface GetSortedArrayType {
  (arr: any[]): any[]
}

/**
 * @description Function to
 * @import import { getSortedArray } from '../../../Shared/getSortedArray'
 */

export const getSortedArray: GetSortedArrayType = arr =>
  arr.sort((a, b) => a.localeCompare(b))
