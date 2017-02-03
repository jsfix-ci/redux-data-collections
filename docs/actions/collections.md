# Collection actions

## Data actions

### addItems({ type, data })
Adds a list of items to the `collection.data` array.

```js
import { addItems } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
const data = [ /* array of items */ ]
const key = 'page-1'
addItems({ type, data })
```

### addSet({ type, data, key })
Same as `addItems` except the items are also stored in `collection.meta.sets[key].data` as an array of relationship identifiers. Also sets `collection.meta.sets[key].meta.isLoaded` to `true`.

```js
import { addSet } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
const data = [ /* array of items */ ]
const key = 'page-1'
addSet({ type, data, key })
```

## Meta actions

### beginLoading({ type })
Sets `collection.meta.isLoading` to `true`

```js
import { beginLoading } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
beginLoading({ type })
```

### endLoading({ type })
Sets `collection.meta.isLoading` to `false`

```js
import { endLoading } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
endLoading({ type })
```

### beginLoadingSet({ type, key })
Sets `collection.meta.sets[key].meta.isLoading` to `true`

```js
import { beginLoadingSet } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
const set = 'page-1'
beginLoadingSet({ type, key })
```

### endLoadingSet({ type, key })
Sets `collection.meta.sets[key].meta.isLoading` to `false`

```js
import { endLoadingSet } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
const set = 'page-1'
endLoadingSet({ type, key })
```

## Advanced data actions
Redux data offers a set of actions for managing the collection array. These map closely to the [Array methods on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

- Unlike normal array functions, all of these actions *replace* the `collection.data` array
- None of the actions *return* anything &mdash; because that's not how redux works :)

### concat({ type, data } )
Adds the item(s) in `data` to the end of the `collection.data` array.

#### Example: Adding one item
```js
import { concat } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
const data = {
  type,
  id: 'media-uuid-3' // <-- should be a unique id
  attributes: {
    title: 'hello' // <-- put whatever attributes you like
  }
}
concat({ type, data } )
```

#### Example: Adding many items
```js
import { concat } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
const data = [
  {
    type,
    id: 'media-uuid-4'
    attributes: { title: 'hello' }
  },
  {
    type,
    id: 'media-uuid-5'
    attributes: { title: 'hello' }
  }
]
concat({ type, data } )
```

### filter({ type, func } )
Filter the `collection.data` array using the provided filter func. The result of the filter is returned as the new state.

#### Example: Filtering items by attribute
```js
import { filter } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
const func = (item) => item.attribute.title === 'hello' // <-- only keep items where title is 'hello'
filter({ type, func } )
```

### map({ type, func } )

```js
import { map } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
map({ type, func })
```

### push({ type, data } )

```js
import { push } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
push({ type, data })
```

### reverse({ type } )

```js
import { reverse } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
reverse({ type })
```

### slice({ type, options: { begin, end } } )

```js
import { slice } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
slice({ type, options: { begin, end } })
```

### sort({ type, func } )

```js
import { sort } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
sort({ type, func })
```

### splice({ type, options: { start, deleteCount }, data } )

```js
import { splice } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
splice({ type, options: { start, deleteCount }, data })
```

### unshift({ type, data } )

```js
import { unshift } from 'redux-data/lib/actions/collectionActions'
const type = 'media'
unshift({ type, data })
```
