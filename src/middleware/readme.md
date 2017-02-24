# Using redux-data middleware
This middleware is designed to be generic. It is the responsibility of the implementer to provide valid data. Essentially, this middleware is a saga that outsources the `fetch` portion of the process to a `fetchAction` function. It simply passes that function an action and expects a valid JSONAPI response. If you are working with an API that does not return a valid JSONAPI response, you will need to transform that response in your custom `fetchAction` function.

## Usage
This functionality is neatly encapsulated in `createRootSaga`.

```js
// 1. import create rootSaga
import { createRootSaga } from 'redux-data'

// 2. You should import your project's runSaga method
import sagaMiddleware from '../store/sagas'

// 3. You should import your custom fetchAction function
import { fetchAction } from '../utils/my-custom-api'

// 4. Create the reduxData saga, ensures that all redux-data sagas use that method when fetching
const reduxDataSaga = createRootSaga(fetchAction)

// 5. Run the saga as you normally would
sagaMiddleware.run(saga)
```

## fetchAction
A typical `fetchAction` function accepts an action and returns `data`.

### How it works
Deep inside a typical redux-data saga, fetchAction is called like this:

```js
// return an object with data and included
const { data, included } = yield call(fetchAction, action)
```

- You can review [an example]('./fetchItems.js').
- `call` comes from [`redux-saga`](https://redux-saga.github.io/redux-saga/docs/api/index.html#callfn-args)
- `data` is expected to be the "data" member from a valid JSONAPI [compound document](http://jsonapi.org/format/#document-compound-documents)
- `included` is expected to be the "included" member from a valid JSONAPI [compound document](http://jsonapi.org/format/#document-compound-documents)

### Example `fetchAction` functions
```js
// inside 'utils/my-custom-api/index.js'

// 1. convert the action into a URL for your API
import buildActionUrl from './helpers/buildActionUrl'

// 2. transform the JSON response to conform to the JSONAPI spec
import transform from './transform'

// 3. fetch a url, extract json, return data
export const fetchAction = action => fetch(buildActionUrl(action))
  .then(response => response.json())
  .then(json => transform(json, action))
```

- `action` is always the action that was received by the saga. The action comes from the [`takeEvery`](https://redux-saga.github.io/redux-saga/docs/api/index.html#takeeverypattern-saga-args) function in redux-saga.
- `buildActionUrl` is outside the scope of this document. It should accept and action and return a URL.
- `transform` is outside the scope of this document. It should accept a json response and return a valid JSONAPI [compound document](http://jsonapi.org/format/#document-compound-documents)

### Return value
- `fetchAction(action)` should return an object or a promise that resolves to an object.
- The object should resemble `{ data, included }`
