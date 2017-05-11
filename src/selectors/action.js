import get from 'lodash.get'

export const selectPayload = action => action.payload
export const selectMeta = action => action.meta

export const selectType = action => get(selectMeta(action), 'type')
export const selectId = action => get(selectMeta(action), 'id')
export const selectData = action => get(selectPayload(action), 'data')
export const selectOptions = action => get(selectPayload(action), 'options')
export const selectKey = action => get(selectPayload(action), 'key')
export const selectValue = action => get(selectPayload(action), 'value')
export const selectFunc = action => get(selectPayload(action), 'func')
export const selectErrors = action => get(selectPayload(action), 'errors')
