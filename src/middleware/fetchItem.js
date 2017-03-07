import { put, call } from 'redux-saga/effects'
import { beginLoadingItem, endLoadingItem, loadItem } from '../actions/item'
import { loadIncludedItems, loadItems } from '../actions/collection'
import { selectType, selectKey, selectOptions } from '../selectors/action'
import { getFetchActionFunc } from './'
import invariant from 'invariant'

const fetchItem = function * (action) {
  const fetchAction = getFetchActionFunc()
  // TODO: add an invariant here
  if (fetchAction === undefined) {
    // eslint-disable-next-line max-len
    invariant(false, 'fetchAction should be defined using createRootSaga(fetchAction). (details at https://github.com/heygrady/redux-data/tree/master/src/middleware/readme.md)')
    return
  }
  const type = selectType(action)
  if (!type) { return }
  const key = selectKey(action)
  const options = selectOptions(action)
  try {
    yield put(beginLoadingItem({ type, key, options }))
    const { data, included } = yield call(fetchAction, action)
    console.log('data', data)
    if (included) {
      yield put(loadIncludedItems({ data: included }))
    }
    if (Array.isArray(data)) {
      yield put(loadItems({ type, key, data, options }))
    } else {
      yield put(loadItem({ type, key, data, options }))
    }
    yield put(endLoadingItem({ type, key, options }))
  } catch (error) {
    console.log(error)
  }
}

export default fetchItem
