# Example of working with the api

## I create some collections

```js
// this is your src/store/reducers.js file
import { combineReducers } from 'redux'
import createCollectionReducer from 'redux-data'

// in a naive world we'd just create the reducers and move on
// TODO: you can pass a second argument, an options object
export const createRootReducer = (asyncReducers) => {
  return combineReducers({
    articles: createCollectionReducer('articles'),
    comments: createCollectionReducer('comments'),
    people: createCollectionReducer('people'),
    ...asyncReducers
  })
}
```

## Now I can work with the collection by dispatching actions

```js
// pretend we're inside of mapDispatchToProps (dispatch, ownProps)
// we might dispatch the following actions

// For the collection itself, I want to manage sets of data
addItem({ type, data }) // <-- data could be an array
removeItem({ type, id }) // <-- this alters the collection.data array directly
createItem({ type, data }) // <-- should have attributes and relationships

// We store sets as relationship objects in collection.meta.sets[key]
// In JSONAPI relationship objects is called a [resource identifier object](http://jsonapi.org/format/#document-resource-identifier-objects)
// A relationship object looks like { type, id }
addSet({ type, key, data }) // <-- adds the items to the collection.data array, too

// For the items themselves, I want to buffer changes
updateItem({ type, id, data }) // <-- stores changes in item.meta.changedAttributes and item.relationships[key].meta.changedData
resetItem({ type, id }) // <-- clears changedAttributes changedData

saveItem({ type, id }) // <-- commits the buffered changes
                       //     - sets item.meta.isSaved
                       //     - merges item.meta.changedAttributes into item.attributes
                       //     - calls save on every relationship too
                       //     - clears item.meta.changedAttributes

// TODO: you would still want to have a saga to POST that change to the backend.
syncItem({ type, id }) // <-- saves the item and sends it to the server
                       //     - calls saveItem for you
                       //     - reverts the save if the sync fails
```

## We make available a bunch of actions for managing the list, items and relationships

```js
// for the collection (list) the array changes happen in place
push({ type, data})
splice({ type, data, options: { begin, end } })

// for the item, we buffer changes by key
// changes are stored in item.meta.changedAttributes[key] = value
// selectors should merge the two together like: attributes = { ...item.attributes, ...item.meta.changedAttributes}
setAttribute({ type, id, key, value })
setAttributes({ type, id, data }) // <-- key/value object like { [key]: value }
toggleAttribute({ type, id, key })

// for the relationship, we also buffer changes
// these changes get stored in relationships[key].meta.changedData
// selectors should read from that value if it exists, like return relationships[key].meta.changedData || relationships[key].data
addRelationship({ type, id, key, data }) // <-- pushes onto array
removeRelationship({ type, id, key, data }) // <-- prunes from array by data.id
setRelationship({ type, id, key, data }) // <-- replace the whole array

// (overwrites relationships[key].data with relationships[key].meta.changedData)
saveRelationship({ type, id, key }) // <-- commits the buffered changes to the relationship

// TODO: you would still want to have a saga to POST that change to the backend.
```

- Collections aren't buffered.
