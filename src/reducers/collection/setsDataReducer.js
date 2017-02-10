import { handleActions } from 'redux-actions'
import {
  COLLECTION_ADD_ITEMS
} from '../../constants/collection'
import { selectData } from '../../selectors/action'

const mapItemToIdentifier = ({ type, id }) => ({ type, id })

const setsDataReducer = handleActions({
  [COLLECTION_ADD_ITEMS]: (state, action) => {
    const data = selectData(action)
    if (!data) { return state }
    return data.map(mapItemToIdentifier)
  }
}, [])

export default setsDataReducer
