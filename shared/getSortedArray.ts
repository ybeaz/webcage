interface GetTemplateType {
  (arr: any[]): any[]
}

/**
 * @description Function to
 * @import import { getTemplate } from '../../../Shared/getTemplate'
 */

export const getSortedArray: GetTemplateType = arr =>
  arr.sort((a, b) => a.localeCompare(b))
