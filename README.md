# redux-data
Redux actions, reducers and selectors for managing data in JSONAPI format.

## About

## Installation

### NPM
```
npm install --save redux-data
```

### Yarn
```
yarn add redux-data
```

## Usage
These examples presume you're using React Redux Starter Kit (because I do). There's nothing particularly special about one react-redux kit versus another. You should be able to adapt these examples to your needs.

### Create reducers for your collections
Redux-data exports the `collectionReducer` by default. The default reducer is actually a "reducer creator" -- it's a curried function. You need to pass it some configuration by default so that it knows what you plan to store in the collection. This configuration is also important fo

```js
import { combineReducers } from 'redux'
import collectionReducer from 'redux-data'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    articles: collectionReducer({ type: 'articles' }),
    comments: collectionReducer({ type: 'comments' }),
    people: collectionReducer({ type: 'people' }),
    ...asyncReducers
  })
}

// ...
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
    attributes: selectItemAttributes(state)('post', 'post-id-1'),
    name: selectItemAttributeByName(state)('post', 'post-id-1', 'name'),
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

### Examples

## Docs
