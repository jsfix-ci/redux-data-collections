import { handleActions } from 'redux-actions'
import {
  COLLECTION_LOAD_ITEMS,
  COLLECTION_ADD_ITEMS
} from '../../constants/collection'
import { selectData } from '../../selectors/action'

const mapItemToIdentifier = ({ type, id }) => ({ type, id })

const setsDataReducer = handleActions({
  [COLLECTION_LOAD_ITEMS]: (state, action) => {
    action = { ...action }
    action.type = COLLECTION_ADD_ITEMS
    return setsDataReducer(state, action)
  },
  [COLLECTION_ADD_ITEMS]: (state, action) => {
    const data = selectData(action)
    if (!data) { return state }
    return data.map(mapItemToIdentifier)
  }
}, [])

export default setsDataReducer
