# Item structure
In `redux-data` we store structured items. These are inspired by [resource objects](http://jsonapi.org/format/1.1/#document-resource-objects) in the [JSONAPI standard](http://jsonapi.org/format/1.1/). JSONAPI calls resource objects "entities." In `redux-data`, this is called an `item`.

Items are stored in collections.

```js
const name = 'articles'

// pretend our state looks like this:
state[name].data = [ item ] // <-- a collection is a list of items
```

## Example 1: Standard Item
Below you can see a standard item. Every item has a type and an ID at minimum.

- `type` is required, should be a valid [member name](http://jsonapi.org/format/1.1/#document-member-names)
- `id` is required, should be a string, must be unique for the type, consider using a [uuid](https://www.npmjs.com/package/uuid)
- `attributes` is a key-value object, should be a valid [attributes object](http://jsonapi.org/format/1.1/#document-resource-object-attributes)

  **Example:** `const attributes = { title: 'hello' }`
- `relationships` should be a valid [relationships object](http://jsonapi.org/format/1.1/#document-resource-object-relationships). Should contain a `data` and a `meta` object. The data is a [resource linkage](#document-resource-object-linkage). The `data` may be a single [resource identity object](http://jsonapi.org/format/1.1/#document-resource-identifier-objects) or an array of resource objects.

  **Example:** `const data = { type: 'person', id: 'person-uuid-1' }`

  **Example:** `const relationships = { author: { data, meta } }`
- `meta` is a catch all for data "about the item". It is a key value store.

  **Example:** `const meta = { isLoaded: true, isSaved: false }`

```js
// an item looks like this:
const item = {
  type,
  id,
  attributes,
  relationships,
  meta
}
```

### Full item
Below you can see a fully fleshed out item object. You can see the structure of relationships is a little more complex than attributes. Relationships describe links to items in other collections.

```js
// example item
const item = {
  type: 'article', // <-- @see http://jsonapi.org/format/1.1/#document-resource-object-identification
  id: 'article-uuid-1', // <-- always a string
  attributes: {
    title: 'hello',
    content: 'world'
  },
  relationships: {
    author: {
      data: { type: 'person', id: 'person-uuid-1' },
      meta: {}
    },
    comments: {
      data: [
        { type: 'comment', id: 'comment-uuid-1' },
        { type: 'comment', id: 'comment-uuid-1' }
      ],
      meta: {}
    }
  },
  meta: {}
}
```

## Example 2: With changes
You can buffer changes to items. When you make changes to items the changes are stored in `meta` objects instead of changing the attributes or relationships directly. This allows for editing to be "reset". A future plan is to implement deep undo as an add-on.

```js
// item with changes
const item = {
  type: 'article',
  id: 'article-uuid-1',
  attributes: {
    title: 'hello',
    content: 'world'
  },
  relationships: {
    author: {
      data: { type: 'person', id: 'person-uuid-1' },
      meta: {
        // changed the author but didn't save
        changedData: { type: 'person', id: 'person-uuid-3' }
      }
    },
    comments: {
      data: [
        { type: 'comment', id: 'comment-uuid-1' },
        { type: 'comment', id: 'comment-uuid-2' }
      ],
      meta: {
        // this will replace data on save, removing the relationship to comment 2
        changedData: [
          { type: 'comment', id: 'comment-uuid-1' }
        ]
      }
    }
  },
  meta: {
    changedAttributes: {
      title: 'goodbye', // <-- overwrites title
      subtitle: 'cruel' // <-- a new attribute
    }
  }
}
```
