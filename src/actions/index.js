// export * from './itemActions'
// export * from './listActions'

// TODO: maybe have a func to force type to be set on action payload
export const forceActionType = (type, action) => (payload) => action({ type, ...payload })
