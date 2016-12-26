

```js
// you need to customize the default reducer for your needs.
import dataReducer, { AttributeTypes, RelationshipTypes } from 'redux-data'

// by sending a type we can route actions. Every action at least needs a type.
import {
  createNew, // <-- createNew('post')

} from 'redux-data/actions'

const postsReducer = dataReducer({
  type: 'post', // <-- there will be a list of posts with the type of "post", createNew('post')
  attributes: {
    name: AttributeTypes.string.isRequired
  },
  relationships: {
    comments: RelationshipTypes.many
  }
  // meta will be managed automatically.
})
export default postsReducer
```
