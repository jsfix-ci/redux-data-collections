import { createAction as defaultCreateAction } from 'redux-actions'

export const payloadCreator = ({ data, options } = {}) => ({ data, options })
export const metaCreator = ({ type, id } = {}) => ({ type, id })

export const createAction = (type) => defaultCreateAction(type, payloadCreator, metaCreator)
