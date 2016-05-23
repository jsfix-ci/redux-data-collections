import { createCollectionSelectors } from './selectors'
import { makeCollectionConstants, makeCollectionActions } from './actions'
import { makeCollectionReducer } from './reducer'

export const DEFAULT_COLLECTION_NAME = 'DEFAULT_COLLECTION'
export const DEFAULT_QUERY_NAME = 'DEFAULT_QUERY'

export const makeCollection = (type, { name = DEFAULT_COLLECTION_NAME, baseSelector }) => {
  const selectors = createCollectionSelectors(type, { name, baseSelector })
  const constants = makeCollectionConstants(type, { name })
  const actions = makeCollectionActions(type, { name })
  const reducer = makeCollectionReducer(type, { name })
  return { selectors, constants, actions, reducer }
}

export {
  makeCollection,
  createCollectionSelectors,
  makeCollectionConstants,
  makeCollectionActions,
  makeCollectionReducer
}
export default makeCollection
