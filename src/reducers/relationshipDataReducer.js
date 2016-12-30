import { handleActions } from 'redux-actions'
const PLACEHOLDER = state => state

// TODO: move to own file
export const oneReducer = ({ key, isOne, accepts }) => handleActions({
  PLACEHOLDER
}, {})

// TODO: move to own file
export const manyReducer = ({ key, isOne, accepts }) => handleActions({
  PLACEHOLDER
}, [])

const relationshipDataReducer = ({ key, isOne = false, accepts = [] }) => (state, action) => {
  const config = { key, isOne, accepts }
  return (isOne ? oneReducer(config) : manyReducer(config))(state, action)
}

export default relationshipDataReducer
