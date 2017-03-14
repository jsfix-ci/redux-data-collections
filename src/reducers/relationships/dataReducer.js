import { handleActions } from 'redux-actions'
import { ITEM_COMMIT } from '../../constants/item'
const PLACEHOLDER = state => state

// TODO: move to own file
export const oneReducer = ({ key, isOne, accepts }) => handleActions({
  [ITEM_COMMIT]: (state, action) => {
    const { meta } = action
    const { changedData, isDeleted } = meta
    return isDeleted ? [] : changedData || state
  },
  PLACEHOLDER
}, {})

// TODO: move to own file
export const manyReducer = ({ key, isOne, accepts }) => handleActions({
  [ITEM_COMMIT]: (state, action) => {
    const { meta } = action
    const { changedData, isDeleted } = meta
    return isDeleted ? [] : changedData || state
  },
  PLACEHOLDER
}, [])

const relationshipDataReducer = ({ key, isOne = false, accepts = [] }) => (state, action) => {
  const config = { key, isOne, accepts }
  return (isOne ? oneReducer(config) : manyReducer(config))(state, action)
}

export default relationshipDataReducer
