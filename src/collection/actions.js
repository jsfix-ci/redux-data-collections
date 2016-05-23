import { createAction } from 'redux-actions'
import { singularize, pluralize, camelize } from 'inflector'
import upperFirst from 'lodash.upperfirst'
import snakeCase from 'lodash.snakeCase'
import { DEFAULT_COLLECTION_NAME } from './index'

// constants

// for sagas
export const FETCH_ENTITY = 'FETCH_ENTITY'
export const FETCH_COLLECTION_ALL = 'FETCH_COLLECTION_ALL'
export const FETCH_COLLECTION_ALL_PAGE = 'FETCH_COLLECTION_ALL_PAGE'
export const FETCH_COLLECTION_ALL_NEXT = 'FETCH_COLLECTION_ALL_NEXT'
export const FETCH_COLLECTION_ALL_PREV = 'FETCH_COLLECTION_ALL_PREV'
export const FETCH_COLLECTION_QUERY = 'FETCH_COLLECTION_QUERY'
export const FETCH_COLLECTION_QUERY_PAGE = 'FETCH_COLLECTION_QUERY_PAGE'
export const FETCH_COLLECTION_QUERY_NEXT = 'FETCH_COLLECTION_QUERY_NEXT'
export const FETCH_COLLECTION_QUERY_PREV = 'FETCH_COLLECTION_QUERY_PREV'

export const SAVE_ENTITY = 'SAVE_ENTITY'
export const REMOVE_ENTITY = 'REMOVE_ENTITY'

// for reducers, from sagas
export const SWAP_ENTITY_ID = 'SWAP_ENTITY_ID'
export const RECEIVE_ENTITY = 'RECEIVE_ENTITY'
export const RECEIVE_COLLECTION_ALL = 'RECEIVE_COLLECTION_ALL'
export const RECEIVE_COLLECTION_QUERY = 'RECEIVE_COLLECTION_QUERY'

export const SET_COLLECTION_ALL_META = 'SET_COLLECTION_ALL_META'
export const TOGGLE_COLLECTION_ALL_META = 'TOGGLE_COLLECTION_ALL_META'
export const SET_COLLECTION_QUERY_META = 'SET_COLLECTION_QUERY_META'
export const TOGGLE_COLLECTION_QUERY_META = 'TOGGLE_COLLECTION_QUERY_META'

// for reducers
export const CREATE_ENTITY = 'CREATE_ENTITY'
export const REMOVE_ENTITY_FROM_STORE = 'REMOVE_ENTITY_FROM_STORE'
export const SET_ENTITY_ATTRIBUTE = 'SET_ENTITY_ATTRIBUTE'
export const SET_ENTITY_ATTRIBUTES = 'SET_ENTITY_ATTRIBUTES'
export const TOGGLE_ENTITY_ATTRIBUTE = 'TOGGLE_ENTITY_ATTRIBUTE'
export const SET_ENTITY_META = 'SET_ENTITY_META'
export const TOGGLE_ENTITY_META = 'TOGGLE_ENTITY_META'

const namespaceConstant = (type, name, constant) => (
  `${constant}_${snakeCase(type).toUpperCase()}:${snakeCase(name).toUpperCase()}`
)

const namespaceConstants = (type, name, constants) => constants.reduce((cs, constant) => {
  const namespacedConstant = namespaceConstant(type, name, constant)
  return { ...cs, [namespacedConstant]: namespacedConstant }
}, {})

export const makeCollectionConstants = (type, { name = DEFAULT_COLLECTION_NAME }) => {
  return namespaceConstants(type, name, [
    FETCH_ENTITY,
    FETCH_COLLECTION_ALL,
    FETCH_COLLECTION_ALL_PAGE,
    FETCH_COLLECTION_ALL_NEXT,
    FETCH_COLLECTION_ALL_PREV,
    FETCH_COLLECTION_QUERY,
    FETCH_COLLECTION_QUERY_PAGE,
    FETCH_COLLECTION_QUERY_NEXT,
    FETCH_COLLECTION_QUERY_PREV,

    SAVE_ENTITY,
    REMOVE_ENTITY,

    SWAP_ENTITY_ID,
    RECEIVE_ENTITY,
    RECEIVE_COLLECTION_ALL,
    RECEIVE_COLLECTION_QUERY,

    SET_COLLECTION_ALL_META,
    TOGGLE_COLLECTION_ALL_META,
    SET_COLLECTION_QUERY_META,
    TOGGLE_COLLECTION_QUERY_META,

    CREATE_ENTITY,
    REMOVE_ENTITY_FROM_STORE,
    SET_ENTITY_ATTRIBUTE,
    SET_ENTITY_ATTRIBUTES,
    TOGGLE_ENTITY_ATTRIBUTE,
    SET_ENTITY_META,
    TOGGLE_ENTITY_META
  ])
}

export const makeCollectionActions = (type, { name = DEFAULT_COLLECTION_NAME }) => {
  const namespace = (constant) => namespaceConstant(type, name, constant)
  const entity = upperFirst(camelize(singularize(type)))
  const collection = upperFirst(camelize(pluralize(type)))
  return {
    [`fetch${entity}`]: createAction(namespace(FETCH_ENTITY)),
    fetchAll: createAction(namespace(FETCH_COLLECTION_ALL)),
    fetchAllPage: createAction(namespace(FETCH_COLLECTION_ALL_PAGE)),
    fetchAllNext: createAction(namespace(FETCH_COLLECTION_ALL_NEXT)),
    fetchAllPrev: createAction(namespace(FETCH_COLLECTION_ALL_PREV)),
    fetchQuery: createAction(namespace(FETCH_COLLECTION_QUERY)),
    fetchQueryPage: createAction(namespace(FETCH_COLLECTION_QUERY_PAGE)),
    fetchQueryNext: createAction(namespace(FETCH_COLLECTION_QUERY_NEXT)),
    fetchQueryPrev: createAction(namespace(FETCH_COLLECTION_QUERY_PREV)),

    [`save${entity}`]: createAction(namespace(SAVE_ENTITY)),
    [`remove${entity}`]: createAction(namespace(REMOVE_ENTITY)),

    [`swap${entity}Id`]: createAction(namespace(SWAP_ENTITY_ID)),
    [`receive${entity}`]: createAction(namespace(RECEIVE_ENTITY)),
    receiveAll: createAction(namespace(RECEIVE_COLLECTION_ALL)),
    receiveQuery: createAction(namespace(RECEIVE_COLLECTION_QUERY)),

    [`set${collection}Meta`]: createAction(namespace(SET_COLLECTION_ALL_META)),
    [`togle${collection}Meta`]: createAction(namespace(TOGGLE_COLLECTION_ALL_META)),
    setQueryMeta: createAction(namespace(SET_COLLECTION_QUERY_META)),
    toggleQueryMeta: createAction(namespace(TOGGLE_COLLECTION_QUERY_META)),

    [`create${entity}`]: createAction(namespace(CREATE_ENTITY)),
    [`remove${entity}FromStore`]: createAction(namespace(REMOVE_ENTITY_FROM_STORE)),
    [`set${entity}Attribute`]: createAction(namespace(SET_ENTITY_ATTRIBUTE)),
    [`set${entity}Attributes`]: createAction(namespace(SET_ENTITY_ATTRIBUTES)),
    [`toggle${entity}Attribute`]: createAction(namespace(TOGGLE_ENTITY_ATTRIBUTE)),
    [`set${entity}Meta`]: createAction(namespace(SET_ENTITY_META)),
    [`toggle${entity}Meta`]: createAction(namespace(TOGGLE_ENTITY_META))
  }
}
