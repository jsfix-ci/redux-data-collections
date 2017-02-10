import { handleActions } from 'redux-actions'
import {
  COLLECTION_ADD_ITEMS,
  COLLECTION_BEGIN_LOADING_ITEMS,
  COLLECTION_END_LOADING_ITEMS
} from '../../constants/collection'
import { selectKey } from '../../selectors/action'
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

export default (type, key) => (state = {}, action) => {
  if (!action) { return state }
  return metaReducer(state, action)
}
