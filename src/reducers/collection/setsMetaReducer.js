import { handleActions } from 'redux-actions'
import {
  COLLECTION_ADD_SET,
  COLLECTION_BEGIN_LOADING_SET,
  COLLECTION_END_LOADING_SET
} from '../../constants/collectionConstants'

const setsMetaReducer = handleActions({
  [COLLECTION_ADD_SET]: (state, action) => ({ ...state, isLoaded: true }),
  [COLLECTION_BEGIN_LOADING_SET]: (state, action) => ({ ...state, isLoading: true }),
  [COLLECTION_END_LOADING_SET]: (state, action) => ({ ...state, isLoading: false })
}, {})

export default setsMetaReducer
