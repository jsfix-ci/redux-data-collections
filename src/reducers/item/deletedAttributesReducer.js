import { handleActions } from 'redux-actions'
import {
  ITEM_ATTRIBUTE_RESET,
  ITEM_ATTRIBUTE_DELETE
} from '../../constants/attributes'
import { selectKey } from '../../selectors/action'

const deletedAttributesReducer = handleActions({
  [ITEM_ATTRIBUTE_RESET]: (state, action) => {
    const key = selectKey(action)
    return state.filter(value => !key)
  },
  [ITEM_ATTRIBUTE_DELETE]: (state, action) => {
    const key = selectKey(action)
    return [ ...state, key ]
  }
}, [])

export default deletedAttributesReducer
