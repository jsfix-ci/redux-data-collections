redux-saga-helpers

```js
const someAction = createAction(ACTION_NAME, payload => payload)

// creates a watcher, you still need to create your root saga
const todoSaga = watchAction(ACTION_NAME, function * (action) {
  yield put(someAction(payload))
})

// you can watchLatest if you want, uses takeLatest under the hood
const anotherTodoSaga = watchLatestAction(ACTION_NAME, function * (action) {
  yield put(someAction(payload))
})

// this is a stand-alone saga.
// usage yield todoSaga(action)
const standalineTodoSaga = take(ACTION_NAME, function * (action) {
  yield put(someAction(payload))
})

export const rootSaga = combineWatchers([todoSaga, anotherTodoSaga])

const todoReducer = handleAction(ACTION_NAME, (state, action) => )

```
