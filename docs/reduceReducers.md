# Reducing reducers
Reduce reducers allows you to chain reducers to run in sequence. Each reducer in the sequence receives the state from the preceding reducer. It looks like this:

```js
// src/modules/media/index.js
import createCollectionReducer, { reduceReducers } from 'redux-data'
import { handleActions } from 'redux-actions'
import { ITEM_ADD } from 'redux-data/lib/constants'
import { CUSTOM_ACTION } from './constants'

// create a collection reducer
const collectionReducer = createCollectionReducer('media')

// create a custom reducer
const mediaReducer = handleActions({
  [CUSTOM_ACTION]: state => state, // <-- add your own actions
  [ITEM_ADD]: state => state // <-- or listen for built-in actions
}, {})

// first, the collection reducer returns the state
// then, your custom reducer's state comes from the collection reducer
// you can swap the order if you'd like
export default reduceReducers(collectionReducer, mediaReducer)
```
