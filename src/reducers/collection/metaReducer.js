import { handleActions } from 'redux-actions'
import {
  COLLECTION_ADD_SET,
  COLLECTION_BEGIN_LOADING,
  COLLECTION_END_LOADING,
  COLLECTION_BEGIN_LOADING_SET,
  COLLECTION_END_LOADING_SET
} from '../../constants/collectionConstants'

import setsReducer from './setsReducer'

const reducers = {
  sets: setsReducer
}

const mapKeyToReducer = (key) => (state, action) => ({ ...state, [key]: reducers[key] })

const metaReducer = handleActions({
  [COLLECTION_ADD_SET]: mapKeyToReducer('sets'),
  [COLLECTION_BEGIN_LOADING_SET]: mapKeyToReducer('sets'),
  [COLLECTION_END_LOADING_SET]: mapKeyToReducer('sets'),

  [COLLECTION_BEGIN_LOADING]: (state, action) => ({ ...state, isLoading: true }),
  [COLLECTION_END_LOADING]: (state, action) => ({ ...state, isLoading: false })
}, {})

export default (type, options) => (state = {}, action) => {
  if (!action) { return state }
  return metaReducer(state, action)
}
