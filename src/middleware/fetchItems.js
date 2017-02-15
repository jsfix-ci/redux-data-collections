import { put, call } from 'redux-saga/effects'
import { beginLoadingItems, endLoadingItems, loadItems, loadIncludedItems } from '../actions/collection'
import { selectType, selectKey, selectOptions } from '../selectors/action'
import { getFetchActionFunc } from './'

const fetchItems = function * (action) {
  const fetchAction = getFetchActionFunc()
  if (fetchAction === undefined) { return }
  const type = selectType(action)
  if (!type) { return }
  const key = selectKey(action)
  const options = selectOptions(action)
  try {
    yield put(beginLoadingItems({ type, key, options }))
    const { data, included } = yield call(fetchAction, action)
    if (included) {
      yield put(loadIncludedItems({ data: included }))
    }
    yield put(loadItems({ type, key, data, options }))
    yield put(endLoadingItems({ type, key, options }))
  } catch (error) {
    console.log(error)
  }
}

export default fetchItems
