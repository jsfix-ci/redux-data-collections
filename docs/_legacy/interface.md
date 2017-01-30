
# Entities

```js
import {
  makCollection, // type, name, baseSelector { selectors, constants, actions, reducer }
  makeCollectionSelectors, // type, baseSelector
  makeCollectionConstants, // type, name = undefined <-- name allows for storing types in different locations
  makeCollectionActions, // type, name = undefined
  makeCollectionReducer, // type, name = undefined <-- allows you to stash collections where you like
  middleware, // options { baseUri }
} from 'redux-data'
```

```js
const {
  getAll,
  getAllPage, // num
  getAllNext,
  getAllPrev,
  getAllMeta, // key
  getAllMetaAttributes,

  getQuery, // name
  getQueryPage, // name, num
  getQueryNext, // name
  getQueryPrev, // name
  getQueryMeta, // name, key
  getQueryMetaAttributes, // name

  getEntity, // id

  getEntityAttribute, // id, key
  getEntityAttributes, // id

  getEntityRelationship, // id, key
  getEntityRelationships, // id

  getEntityMeta, // id, key
  getMetaAttributes, // id

  getEntityUndo, // id, depth = 0
  getEntityRedo, // id, depth = 0
  getEntityUndoDepth, // id
  getEntityRedoDepth, // id

  makeEntitySelectors, // id

  isLoadingAll,
  isLoadingQuery, // name
  isLoadingEntity, // id
  isSavingEntity, // id
} = makeCollectionSelectors('todos', baseSelector)

const {
  getId,

  get, // alias: getAttr
  getAttr, // key
  getAttributes,
  makeAttributeSelectors, // key { isDirty, hasUndo, hasRedo, getUndo, getRedo }

  getRelationship, // key
  getRelationships,
  // TODO: can be paged
  // TODO: support loading, other meta
  makeRelationshipSelectors, // key { get, getAll, isDirty, hasUndo, hasRedo, getUndo, getRedo, isOne, isMany }

  getMeta, // key
  getMetaAttributes, // key

  getDirtyAttributes,
  isAttributeDirty, // key
  hasDirtyAttributes,

  exists,
  isNew,
  isLoading,
  isSaving,

  getUndo, // depth = 0
  getRedo, // depth = 0
  getUndoDepth,
  getRedoDepth,
  hasUndo,
  hasRedo
} = makeEntitySelectors(id)
```

```js
const {
  fetchAll, // options
  fetchAllPage, // options, num
  fetchAllNext, // options
  fetchAllPrev, // options
  makeFetchAllActions, // options

  fetchQuery, // name
  fetchQueryPage, // name, num
  fetchQueryNext, // name
  fetchQueryPrev, // name
  makeQueryActions, // name

  createEntity, // id
  saveEntity, // id
  fetchEntity, // id
  removeEntity, // id
  removeEntityFromStore, // id

  setEntityRelationship, // id, key, id
  addEntityRelationship, // id, key, value
  removeEntityRelationship, // id, key, id
  setEntityRelationships, // id, relationships
  addEntityRelationships, // id, relationships

  setEntityAttribute, // id, key, value
  toggleEntityAttribute, // id, key
  removeEntityAttribute, // id, key
  undoEntityAttribute, // id, key, depth = 0
  redoEntityAttribute, // id, key, depth = 0
  setEntityAttributes, // id, attributes
  addEntityAttributes, // id, attributes

  setEntityMeta, // id, key, value
  toggleEntityMeta, // id, key
  removeEntityMeta, // id, key
  setMetaAttributes, // id, attributes
  addMetaAttributes, // id, attributes

  undoEntity, // id, depth = 0
  redoEntity, // id, depth = 0

  makeEntityActions, // id
} = makeCollectionActions('todos')

const {
  fetch,
  remove,
  removeFromStore,
  save,
  undo,
  redo

  set, // alias: setAttr
  setAttr, // key
  toggle, // alias: toggleAttr
  toggleAttr, // key
  removeAttr, // key
  setAttributes, // attributes
  makeAttributeActions, // key { set, toggle, remove, save, undo, redo }

  setRelationship, // key, id
  addRelationship, // key, id
  removeRelationship, // key, id
  setRelationships, // key, relationships
  addRelationships, // key, relationships
  makeRelationshipActions, // key { set, set, add, remove, save, undo, redo }

  setMeta,
  toggleMeta,
  removeMeta,
  setMetaAttributes,
  makeMetaActions, // key { set, toggle, remove, save, undo, redo }

} = makeEntityActions(id)
```

