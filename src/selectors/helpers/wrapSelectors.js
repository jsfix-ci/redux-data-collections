/** usage
import { selectAttributes } from 'redux-data/selectors/itemSelectors'
const selector = (state) => state.somethingArbitrary.posts
const [selectAttributes] = wrapSelectors(selector, selectAttributes)
const type = 'post'
const id = 'test-post-id-1'
const name = 'whatever'
const value = selectAttributes({ type, id, name })
**/
const wrapSelectors = (selector, ...selectors) => {
  return selectors.map(s => state => s(selector(state)))
}
export default wrapSelectors
