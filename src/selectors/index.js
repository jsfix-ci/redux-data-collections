import get from 'lodash.get'

export const selectValueByKey = item => key => get(item, key)
export const selectData = item => get(item, 'data')
export const selectMeta = item => get(item, 'meta')
export const selectId = item => get(item, 'id')
export const selectType = item => get(item, 'type')

export * from './item'
export * from './collection'
// export * from './relationships'
