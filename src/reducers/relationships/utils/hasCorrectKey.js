import { selectKey } from '../../../selectors/action'
const hasCorrectKey = (config, action) => {
  const actionKey = selectKey(action)
  return actionKey === config.key
}
export default hasCorrectKey
