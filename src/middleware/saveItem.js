import { put, call, select } from 'redux-saga/effects'
import { commitItem, beginSavingItem, endSavingItem, loadItem } from '../actions/item'
import { loadIncludedItems } from '../actions/collection'
import { selectType, selectId, selectOptions } from '../selectors/action'
import { selectItem } from '../selectors/item'
import { getFetchActionFunc } from './'
import invariant from 'invariant'

const saveItem = function * (action) {
  const fetchAction = getFetchActionFunc()
  if (fetchAction === undefined) {
    // eslint-disable-next-line max-len
    invariant(false, 'fetchAction should be defined using createRootSaga(fetchAction). (details at https://github.com/heygrady/redux-data/tree/master/src/middleware/readme.md)')
    return
  }
  const type = selectType(action)
  const id = selectId(action)
  if (!type || !id) {
    // eslint-disable-next-line max-len
    invariant(false, 'saveItem should define a type and id, like saveItem({ type: \'post\', id: \'some_id\' })')
    return
  }
  const options = selectOptions(action)
  try {
    yield put(beginSavingItem({ type, id, options }))
    const item = yield select(state => selectItem(state)({ type, id }))
    const newAction = { ...action, payload: { ...action.payload, data: item } }
    const { data, included } = yield call(fetchAction, newAction)
    console.log('saved:', { type, id }, 'recieved:', { data, included })
    // TODO: only commit if save was successful
    yield put(commitItem({ type, id, options }))
    if (included) {
      yield put(loadIncludedItems({ data: included }))
    }
    if (data) {
      yield put(loadItem({ type, id, data, options }))
    }
    yield put(endSavingItem({ type, id, options }))
  } catch (error) {
    console.log(error)
  }
}

export default saveItem
