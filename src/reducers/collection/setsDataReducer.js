import { handleActions } from 'redux-actions'
import {
  COLLECTION_ADD_ITEMS
} from '../../constants/collectionConstants'
import { selectData } from '../../selectors/actionSelectors'

const mapItemToIdentifier = ({ type, id }) => ({ type, id })

const setsDataReducer = handleActions({
  [COLLECTION_ADD_ITEMS]: (state, action) => {
    const data = selectData(action)
    if (!data) { return state }
    return data.map(mapItemToIdentifier)
  }
}, [])

export default setsDataReducer
