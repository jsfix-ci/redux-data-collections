import reduceReducers from 'reduce-reducers'
import reducer from './reducers'
import rootSaga from './middleware'
export { rootSaga, reduceReducers }
export * from './middleware'
export * from './reducers'

export default reducer
