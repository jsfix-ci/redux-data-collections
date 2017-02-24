import reduceReducers from 'reduce-reducers'
import reducer from './reducers'
import rootSaga, { setFetchActionFunc } from './middleware'

export const createRootSaga = fetchAction => {
  setFetchActionFunc(fetchAction)
  return rootSaga
}

export { rootSaga, reduceReducers }
export * from './middleware'
export * from './reducers'

export default reducer
