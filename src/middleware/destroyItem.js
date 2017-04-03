import { put, call } from 'redux-saga/effects'
import { deleteItem } from '../actions/item'
import { selectType, selectId } from '../selectors/action'
import saveItem from './saveItem'

const destroyItem = function * (action) {
  const type = selectType(action)
  const id = selectId(action)
  yield put(deleteItem({ type, id }))
  yield call(saveItem, action)
}

export default destroyItem
