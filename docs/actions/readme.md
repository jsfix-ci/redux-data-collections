# Redux Data actions

## Built-in actions
- [items](./items.md)
- [collections](./collections.md)
- [relationships](./relationships.md)

## Usage
Below is a toy example. It shows a container where you would dispatch an action on click.

```js
import { connect } from 'react-redux'
import SomeWidget from '../components/SomeWidget'
import { concat } from 'redux-data/lib/actions/collectionActions' // <-- import the action

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // NOTE: `type` and `data` could come from `ownProps` or `args`
  const type = 'media'
  const data = {
    type,
    id: 'media-uuid-3'
    attributes: {
      title: 'hello'
    }
  }

  return {
    // we just need to provide a function to our component that will dispatch our action
    click: (...args) => dispatch(concat({ type, data } )) // <-- dispatch the action
  }
}

const SomeWidgetContainer = connect(mapStateToProps, mapDispatchToProps)(SomeWidget)

export default SomeWidgetContainer

```

## TMI on actions
Redux Data uses [`redux-actions`](https://github.com/acdlite/redux-actions) to create "[Flux Standard Actions](https://github.com/acdlite/flux-standard-action)."

If you're not already using redux-actions in your projects, you should strongly consider it. At a high level, a standard action looks like this:

```js
// a flux standard action
const action = {
  type,    // required: all actions need a type
  payload, // store data in the payload
  meta,    // other information goes in meta
  error
}
```

We're actually extending all of our actions to use a common `payloadCreator` and `metaCreator`.

```js
// a redux-data standard action
const action = {
  type,
  payload: { // all are optional, depending on action
    data,    // should be an item, array of items, relationship identifier or array of relationship identifiers
    options, // should be a key-value object of options
    key,     // should be a valid key in an item's attributes, relationships or meta object
    value,   // should be a valid value in an item's attributes, relationships or meta object
    func     // should be a function
  },
  meta: {
    type,    // required: which collection is the action for
    id       // optional: which item is the action for
  },
  error
}
```

In practice, the `paylyoad` and `meta` for a redux-data action will have some or all of the standard keys defined. This is dependent on the action you're trying to use.

**For example:**

```js
import { addItem } from 'redux-data/lib/actions/itemActions'
const type = 'media'
const data = {
  type,
  attributes: {
    title: 'hello'
  }
}

const action = addItem({ type, data })
console.log(action) /** -->
{
  type: '@@redux-data/ITEM_ADD',
  payload: { data },
  meta: { type }
}
**/

```
