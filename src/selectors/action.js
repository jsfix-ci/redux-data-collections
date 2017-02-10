export const selectPayload = action => action.payload || {}
export const selectMeta = action => action.meta || {}

export const selectType = action => selectMeta(action).type
export const selectId = action => selectMeta(action).id
export const selectData = action => selectPayload(action).data
export const selectOptions = action => selectPayload(action).options
export const selectKey = action => selectPayload(action).key
export const selectValue = action => selectPayload(action).value
export const selectFunc = action => selectPayload(action).func
