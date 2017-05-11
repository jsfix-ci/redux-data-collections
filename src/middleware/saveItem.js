import { put, call, select } from 'redux-saga/effects'
import { commitItem, beginSavingItem, endSavingItem, loadItem, setMetaKey, deleteMetaKey } from '../actions/item'
import { loadIncludedItems } from '../actions/collection'
import { selectType, selectId, selectOptions } from '../selectors/action'
import { selectItem, selectRawItem, selectMetaKey } from '../selectors/item'
import { getFetchActionFunc } from './'
import invariant from 'invariant'
import { ITEM_DESTROY } from '../constants'

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
    invariant(false, `saveItem should define a type and id, like saveItem({ type: 'post', id: 'some_id' }). Recieved type of '${type}' and id of '${id}'`)
    return
  }
  const options = selectOptions(action)
  const item = yield select(state => selectItem(state)({ type, id }))
  const rawItem = yield select(state => selectRawItem(state)({ type, id }))
  const isDeleted = selectMetaKey(rawItem)('isDeleted')
  if (!item && !rawItem) {
    invariant(false, `Cannot save item. No item found for type of '${type}' and id of '${id}'`)
    return
  }
  try {
    yield put(beginSavingItem({ type, id, options }))
    const newAction = { ...action, payload: { ...action.payload, data: item } }
    if (isDeleted) { newAction.type = ITEM_DESTROY }
    const { data, included, errors } = yield call(fetchAction, newAction)
    console.log(
      '@@redux-data/middleware/saveItem/fetchAction--after',
      { saved: { type, id }, recieved: { data, included, errors } }
    )
    if (errors && Array.isArray(errors) && errors.length) {
      yield put(setMetaKey({ type, id, key: 'errors', value: errors }))
    } else {
      yield put(deleteMetaKey({ type, id, key: 'errors' }))
    }
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
    console.error(
      '@@redux-data/middleware/saveItem/throw',
      { error }
    )
  }
}

export default saveItem
