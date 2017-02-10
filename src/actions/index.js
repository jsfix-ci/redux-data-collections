import { createAction as defaultCreateAction } from 'redux-actions'

// export * from './collection'
// export * from './item'

/** expect an object with one of these keys:
- type, id -- to identify the entity, blank id means collection
- data -- either an entity or a collection (array) of entities
- options -- an object containing keys and values
- key -- a string that would be valid as a key in an attributes or relationships object
- value -- any value that wold be appropriate in an attribute or meta object
- func -- a callback function to be called within a reducer (if supported by reducer)
**/
// TODO: typecheck the standard keys below
export const payloadCreator = ({ data, options, key, value, func } = {}) => ({ data, options, key, value, func })
export const metaCreator = ({ type, id } = {}) => ({ type, id })

export const createStandardAction = type => defaultCreateAction(type, payloadCreator, metaCreator)
