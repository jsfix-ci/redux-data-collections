# redux-data-collections
Redux actions, reducers and selectors for managing data in JSONAPI format.

## About

## Installation

```
yarn add redux-data-collections
```

## Usage
These examples presume you're using React Redux Starter Kit (because I do). There's nothing particularly special about one react-redux kit versus another. You should be able to adapt these examples to your needs.

Redux-data-collections exports `createCollectionReducer` by default. A collection reducer will only handle actions with a `meta.type` that matches the collection type. For instance, if you create a reducer like `createCollectionReducer('cars')`, the created reducer will only respond to actions where the `action.meta.type === 'cars'`. In practice, this is managed for you.

**Simply add your collections to your root reducer in [`src/store/reducers.js`](https://github.com/davezuko/react-redux-starter-kit/blob/master/src/store/reducers.js)**

```js
import { combineReducers } from 'redux'
import createCollectionReducer from 'redux-data-collections'

// in a naive world we'd just create the reducers and move on
export const createRootReducer = (asyncReducers) => {
  return combineReducers({
    articles: createCollectionReducer('article'),
    comments: createCollectionReducer('comment'),
    people: createCollectionReducer('person'),
    ...asyncReducers
  })
}

// ...
```

### Customizing the default reducer
The reducer returned from `redux-data-collections` is designed to handle specific actions. For most usecases these default actions will allow you to work smoothly with the collections. However, if we need custom actions we can join the collectionReducer from `redux-data-collections` with our custom reducer using `reduceReducers`.

```js
import createCollectionReducer, { reduceReducers } from 'redux-data-collections'
import { handleActions } from 'redux-actions'
import { CUSTOM_ACTION_TYPE } from './constants'

// create a redux-data-collections reducer
const collectionReducer = createCollectionReducer('media')

// create your own reducer
const mediaReducer = handleActions({
  [CUSTOM_ACTION_TYPE]: state => state
}, {})

// join the two reducers together
// the collection reducer will run first, it will capture only redux-data-collections actions
// the media reducer runs second and will get the state after redux-data-collections has altered it
const reducer = reduceReducers(collectionReducer, mediaReducer)

export default reducer
```

### Send actions to your reducers

```js
import { connect } from 'react-redux'
import EditEntity from '../components/EditEntity'
import { setAttribute } from 'redux-data-collections/lib/actions/item'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setAttr: (attribute, value) => dispatch(
      setAttribute({
        type: 'post',
        id: 'post-id-1',
        attribute,
        value
      })
    )
  }
}

const EditEntityContainer = connect(mapStateToProps, mapDispatchToProps)(EditEntity)

export default EditEntityContainer
```

### Select value from the state

```js
import { connect } from 'react-redux'
import EditEntity from '../components/EditEntity'
import { selectItemAttributes, selectItemAttributeByName } from 'redux-data-collections/lib/selectors/item'
import { setAttribute } from 'redux-data-collections/lib/actions/item'

const mapStateToProps = (state, ownProps) => {
  return {
    attributes: selectItemAttributes(state)('post', 'post-id-1'), // <-- all attributes
    name: selectItemAttributeByName(state)('post', 'post-id-1', 'name'), // <-- just the name
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setName: (value) => dispatch(
      setAttribute({
        type: 'post',
        id: 'post-id-1',
        attribute: 'name',
        value
      })
    )
  }
}

const EditEntityContainer = connect(mapStateToProps, mapDispatchToProps)(EditEntity)
export default EditEntityContainer

```
