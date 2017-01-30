# redux-data
Redux actions, reducers and selectors for managing data in JSONAPI format.

## About

## Installation

```
yarn add redux-data
```

## Usage
These examples presume you're using React Redux Starter Kit (because I do). There's nothing particularly special about one react-redux kit versus another. You should be able to adapt these examples to your needs.

Redux-data exports `createCollectionReducer` by default. A collection reducer will only handle actions with a `meta.type` that matches the collection type. For instance, if you create a reducer like `createCollectionReducer('cars')`, the created reducer will only respond to actions where the `action.meta.type === 'cars'`.

**Simply add your collections to your root reducer in `src/store/reducers.js`**

```js
import { combineReducers } from 'redux'
import createCollectionReducer from 'redux-data'

// in a naive world we'd just create the reducers and move on
export const createRootReducer = (asyncReducers) => {
  return combineReducers({
    articles: createCollectionReducer('articles'),
    comments: createCollectionReducer('comments'),
    people: createCollectionReducer('people'),
    ...asyncReducers
  })
}

// ...
```

### Customizing the default reducer
The reducer returned from `redux-data` is designed to handle specific actions. If we need custom actions we can join the collectionReducer form `redux-data` with our custom reducer using `reduceReducers`.

```js
import makeCollectionReducer, { reduceReducers } from 'redux-data'
import { handleActions } from 'redux-actions'
import { CUSTOM_ACTION_TYPE } from './constants'

// create a redux-data reducer
const collectionReducer = makeCollectionReducer('media')

// create your own reducer
const mediaReducer = handleActions({
  [CUSTOM_ACTION_TYPE] state => state
}, {})

// join the two reducers together
// the collection reducer will run first, it will capture only redux-data actions
// the media reducer runs second and will get the state after redux-data has altered it
const reducer = reduceReducers(collectionReducer, mediaReducer)

export default reducer
```

### Send actions to your reducers

```js
import { connect } from 'react-redux'
import EditEntity from '../components/EditEntity'
import { setAttribute } from 'redux-data/lib/actions/itemActions'

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
import { selectItemAttributes, selectItemAttributeByName } from 'redux-data/lib/selectors/itemSelectors'
import { setAttribute } from 'redux-data/lib/actions/itemActions'

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
