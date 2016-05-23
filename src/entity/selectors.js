import makeSelectors from '../utils/makeSelectors'
import memoize from 'lodash.memoize'

// entity

// expects state to be getAll from a collection
const getEntity = memoize((state, id) => state.find(t => t.id === id))

// expects state to be an entity
const getEntityAttribute = (state, key) => state.attributes[key]
const getEntityAttributes = (state) => state.attributes

const getEntityRelationship = (state, key) => state.relationship[key]
const getEntityRelationships = (state) => state.relationships

const getEntityMeta = (state, key) => state.meta[key]
const getMetaAttributes = (state) => state.meta
const getDirtyAttributes = (state) => memoize(getEntityMeta(state, 'dirtyAttributes').reduce((attrs, key) => ({
  ...attrs,
  [key]: getEntityAttribute(state, key)
}), {}))
const hasDirtyAttributes = (state) => (
  !!getEntityMeta(state, 'dirtyAttributes') &&
  !!getEntityMeta(state, 'dirtyAttributes').length
)
const isLoadingEntity = (state) => !!getEntityMeta(state, 'loading')
const isSavingEntity = (state) => !!getEntityMeta(state, 'saving')

const getEntityUndo = (state, depth = 0) => undefined
const getEntityRedo = (state, depth = 0) => undefined
const getEntityUndoDepth = (state) => undefined
const getEntityRedoDepth = (state) => undefined

// accepts a collection and an id
export const makeEntitySelectorsForId = (state, id) => {
  return makeEntitySelectorsForEntity(getEntity(state, id))
}

export const makeEntitySelectorsForEntity = (state) => {
  const createEntitySelector = (selector) => (...args) => selector(state, ...args)
  return {
    getEntity: state,
    ...makeSelectors(state, createEntitySelector, {
      get: getEntityAttribute, // key
      getAttribute: getEntityAttribute, // key
      getAttributes: getEntityAttributes,
      // makeAttributeSelectors

      getRelationship: getEntityRelationship, // key
      getRelationships: getEntityRelationships,
      // makeRelationshipSelectors

      getMeta: getEntityMeta, // key
      getMetaAttributes: getMetaAttributes,
      getDirtyAttributes,
      hasDirtyAttributes,
      isLoading: isLoadingEntity,
      isSaving: isSavingEntity,

      getUndo: getEntityUndo,
      getRedo: getEntityRedo,
      getUndoDepth: getEntityUndoDepth,
      getRedoDepth: getEntityRedoDepth
    })
  }
}

export const createEntitySelectorsForId = (collectionAllSelector, id) => {
  return (state) => makeEntitySelectorsForId(collectionAllSelector(state), id)
}

export const makeEntitySelectors = (state) => {
  const entitySelector = (id) => getEntity(state, id)
  const createEntitySelector = (selector) => (id, ...args) => selector(entitySelector(id), ...args)

  // usage: getEntity(id)
  return {
    getEntity: entitySelector,
    makeEntitySelectors: makeEntitySelectorsForEntity,
    ...makeSelectors(state, createEntitySelector, {
      getEntityAttribute,
      getEntityAttributes,

      getEntityRelationship,
      getEntityRelationships,

      getEntityMeta,
      getMetaAttributes,

      getEntityUndo,
      getEntityRedo,
      getEntityUndoDepth,
      getEntityRedoDepth,

      isLoadingEntity,
      isSavingEntity,
      makeEntitySelectorsForId
    })
  }
}

export const createEntitySelectors = (collectionAllSelector) => {
  return (state) => makeEntitySelectors(collectionAllSelector(state))
}
