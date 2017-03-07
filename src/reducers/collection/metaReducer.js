import { handleActions } from 'redux-actions'
import get from 'lodash.get'
import {
  COLLECTION_LOAD_ITEMS,
  COLLECTION_ADD_ITEMS,
  COLLECTION_BEGIN_LOADING_ITEMS,
  COLLECTION_END_LOADING_ITEMS
} from '../../constants/collection'
import { selectType, selectKey } from '../../selectors/action'
import setsReducer from './setsReducer'

const reducers = {
  sets: setsReducer
}

// TODO: this is clumbsy
const mapMetaKeyToReducer = (metaKey) => (state, action) => ({
  ...state,
  [metaKey]: reducers[metaKey](state[metaKey], action)
})

const metaReducer = handleActions({
  [COLLECTION_LOAD_ITEMS]: (state, action) => {
    action = { ...action }
    action.type = COLLECTION_ADD_ITEMS
    return metaReducer(state, action)
  },
  [COLLECTION_ADD_ITEMS]: (state, action) => {
    const key = selectKey(action)
    if (key) { state = mapMetaKeyToReducer('sets')(state, action) }
    return { ...state, isLoaded: true }
  },
  [COLLECTION_BEGIN_LOADING_ITEMS]: (state, action) => {
    const key = selectKey(action)
    if (key) { state = mapMetaKeyToReducer('sets')(state, action) }
    return { ...state, isLoading: true }
  },
  [COLLECTION_END_LOADING_ITEMS]: (state, action) => {
    const key = selectKey(action)
    if (key) { state = mapMetaKeyToReducer('sets')(state, action) }
    return { ...state, isLoading: false }
  }
}, {})

export default (type, options) => (state, action) => {
  if (state === undefined) {
    state = get(options, 'meta', {})
  }
  if (!action) { return state }

  const collectionType = selectType(action)

  // bail if collection type is wrong
  if (!collectionType || collectionType !== type) { return state }
  return metaReducer(state, action)
}
