import { handleActions } from 'redux-actions'
import {
  COLLECTION_ADD_ITEMS,
  COLLECTION_BEGIN_LOADING_ITEMS,
  COLLECTION_END_LOADING_ITEMS
} from '../../constants/collectionConstants'
import { selectOptions } from '../../selectors/actionSelectors'

const setsMetaReducer = handleActions({
  [COLLECTION_ADD_ITEMS]: (state, action) => ({
    ...state,
    isLoaded: true,
    options: selectOptions(action)
  }),
  [COLLECTION_BEGIN_LOADING_ITEMS]: (state, action) => ({ ...state, isLoading: true }),
  [COLLECTION_END_LOADING_ITEMS]: (state, action) => ({ ...state, isLoading: false })
}, {})

export default setsMetaReducer
