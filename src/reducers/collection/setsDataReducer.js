import { handleActions } from 'redux-actions'
import {
  COLLECTION_ADD_SET
} from '../../constants/collectionConstants'
import { selectData } from '../../selectors/actionSelectors'

const setsDataReducer = handleActions({
  [COLLECTION_ADD_SET]: (state, action) => {
    const data = selectData(action)
    return data || state
  }
}, [])

export default setsDataReducer
