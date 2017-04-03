import { takeEvery } from 'redux-saga/effects'
import {
  COLLECTION_FETCH_ITEMS,
  ITEM_FETCH,
  ITEM_SAVE,
  ITEM_DESTROY
} from '../constants'

// TODO: rename fetchItems to fetchCollection
import fetchItems from './fetchItems'
import fetchItem from './fetchItem'
import saveItem from './saveItem'
import destroyItem from './destroyItem'

// NOTE: you need to define fetchAction as part of setup: setFetchActionFunc(myCustomFetch)
let fetchAction
export const setFetchActionFunc = func => { fetchAction = func }
export const getFetchActionFunc = () => fetchAction

// TODO: move to its own npm module redux-saga-actions
export const createWatcher = (actionType, saga) => {
  return function * () {
    yield takeEvery(actionType, saga)
  }
}

export const watchActions = (sagas) => {
  const watchers = Object.keys(sagas)
    .map(actionType => createWatcher(actionType, sagas[actionType])())
  return function * rootSaga () {
    yield watchers
  }
}

export default watchActions({
  [COLLECTION_FETCH_ITEMS]: fetchItems,
  [ITEM_SAVE]: saveItem,
  [ITEM_FETCH]: fetchItem,
  [ITEM_DESTROY]: destroyItem
})
