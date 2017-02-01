# Creating collection reducers
The whole point of `redux-data` is to facilitate storing data in normalized collections. The object structure is heavily inspired by the [JSONAPI specification](http://jsonapi.org/format/1.1/). This library is aware of [`ember-data`](https://github.com/emberjs/data) an strives to be "Ember Data for Redux."

`redux-data` manages collections in the redux store.

```js
// an empty collection
const name = 'media'
state[collectionName] = {
  data: [],
  meta: {
    sets: {}
  }
}
```

## Example 1: No relationships
You can create a collection reducer simply by passing a type. This is used by the reducer as an item type. The reducer will filter out actions that do not match the type. It expects actions to have an `action.meta.type` that equals the collection type. This is useful because all of your actions can be shared among all collections &mdash; they all have the same interface.

Here we're creating a collection called "media". This collection will only store items with a type of media, like: `type === item.type`.

```js
// src/modules/media/index.js
import createCollectionReducer from 'redux-data'
const type = 'media'
const mediaReducer = createCollectionReducer(type) // <-- give it a type
export default mediaReducer
```

### Usage
To use the reducer you need to add it to your app. These examples are written against the [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit). There's nothing special here. You simply need to import the reducer and combine it with your `rootReducer`.

```js
// @see https://github.com/davezuko/react-redux-starter-kit/blob/master/src/store/reducers.js
import { combineReducers } from 'redux'
import media from 'modules/media' // <-- import your defaultReducer

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    media, // <-- add it to the rootReducer
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

```

## Example 2: Using options
Usually the items in your collection have relationships to items in other collections. You can specify these relationships using an `options` object when you create your collection.

```js
// src/modules/articles/index.js
import createCollectionReducer from 'redux-data'
const type = 'posts'
const options = {
  relationships: {
    author: { isOne: true, accepts: ['person'] }, // <-- only accept specific types
    featuredImage: { isOne: true, accepts: ['media'] }, // <-- only one
    comments: { accepts: ['comments'] } // <-- an array of comments
  }
}
const articlesReducer = createCollectionReducer(type, options)
export default articlesReducer
```

```js
// all options
const options = {
  relationships: {
    author: {             // <-- author matches a relationship key
      isOne: true,        // <-- defaults false
      accepts: ['person'] // <-- required
    },
    boxOfChocolates: {
      accepts: ['two', 'things'] // <-- array of allowed types
    },
    comments: {
      accepts: ['comments']
    }
  }
}
