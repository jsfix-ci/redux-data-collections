export const selectValueByKey = item => key => item !== undefined ? item[key] : undefined
export const selectData = item => selectValueByKey(item)('data')
export const selectMeta = item => selectValueByKey(item)('meta')
export const selectId = item => selectValueByKey(item)('id')
export const selectType = item => selectValueByKey(item)('type')

export * from './item'
export * from './collection'
// export * from './relationships'
