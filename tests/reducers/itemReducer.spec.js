import itemReducer from 'reducers/item'
import {
  // createNew,
  commitItem
  // reload,
  // deleteItem,
  // destroyItem
} from 'actions/item'

import {
  mapAttributes,
  rollbackAttributes,
  setAttributesObject,
  setAttribute,
  resetAttribute,
  toggleAttribute,
  deleteAttribute
} from 'actions/attributes'

let count = 0
const makePost = ({ attributes = {}, relationships = {}, meta = {} } = {}) => {
  return {
    type: 'post',
    id: `test-post-id-${count++}`,
    attributes,
    relationships,
    meta
  }
}

describe('Reducers', () => {
  describe('itemReducer', () => {
    it('returns initial state for empty action', () => {
      const initialState = makePost()
      const expectedState = {...initialState}
      const action = {}
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('commitItem', () => {
      const initialState = makePost({
        attributes: { name: 'Original value' },
        meta: {
          changedAttributes: { name: 'New Value' },
          isSaved: false
        }
      })
      const expectedState = {
        ...initialState,
        attributes: { name: 'New Value' },
        meta: { isSaved: false }
      }

      const payload = { type: 'post', id: initialState.id }
      const action = commitItem(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    // TODO: this means reload from middleware
    // it('reload', () => {
    //   const initialState = makePost()
    //   const expectedState = {...initialState}
    //   const payload = { type: 'post', id: initialState.id }
    //   const action = reload(payload)
    //   const state = itemReducer(initialState, action)
    //   expect(state).toEqual(expectedState)
    // })

    // TODO: this means delete item from middleware
    // it('deleteItem', () => {
    //   const initialState = makePost()
    //   const expectedState = {...initialState}
    //   const payload = { type: 'post', id: initialState.id }
    //   const action = deleteItem(payload)
    //   const state = itemReducer(initialState, action)
    //   expect(state).toEqual(expectedState)
    // })

    // TODO: this should happen in the list
    // it('destroyItem', () => {
    //   const initialState = makePost()
    //   const expectedState = {...initialState}
    //   const payload = { type: 'post', id: initialState.id }
    //   const action = destroyItem(payload)
    //   const state = itemReducer(initialState, action)
    //   expect(state).toEqual(expectedState)
    // })

    it('mapAttributes', () => {
      const initialState = makePost({ attributes: { name: 'Something' } })
      const expectedState = { ...initialState, attributes: { name: true } }
      const payload = { type: 'post', id: initialState.id, func: (value, key, state) => true }
      const action = mapAttributes(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('rollbackAttributes', () => {
      const initialState = makePost({
        attributes: { name: 'Old' },
        meta: { changedAttributes: { name: 'New' }, isSaved: false }
      })
      const expectedState = {
        ...initialState,
        meta: { isSaved: true }
      }
      const payload = { type: 'post', id: initialState.id }
      const action = rollbackAttributes(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('rollbackAttributes with deletedAttributes', () => {
      const initialState = makePost({
        attributes: { name: 'Old', description: 'Something' },
        meta: { changedAttributes: { name: 'New' }, deletedAttributes: ['description'], isSaved: false }
      })
      const expectedState = {
        ...initialState,
        meta: { isSaved: true }
      }
      const payload = { type: 'post', id: initialState.id }
      const action = rollbackAttributes(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('setAttributesObject', () => {
      const initialState = makePost({ attributes: { name: 'Old' } })
      const payload = { type: 'post', id: initialState.id, data: { name: 'New', description: 'Something' } }
      const expectedState = {
        ...initialState,
        meta: { changedAttributes: payload.data, isSaved: false }
      }
      const action = setAttributesObject(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('setAttribute', () => {
      const initialState = makePost()
      const expectedState = { ...initialState, meta: { changedAttributes: { foo: 'bar' }, isSaved: false } }
      const payload = { type: 'post', id: initialState.id, key: 'foo', value: 'bar' }
      const action = setAttribute(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('resetAttribute', () => {
      const initialState = makePost({ meta: { changedAttributes: { foo: 'bar' }, isSaved: false } })
      const expectedState = { ...initialState, meta: { isSaved: true } }
      const payload = { type: 'post', id: initialState.id, key: 'foo' }
      const action = resetAttribute(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('resetAttribute as only deletedAttribute', () => {
      const initialState = makePost({ meta: { deletedAttributes: ['foo'], isSaved: false } })
      const expectedState = { ...initialState, meta: { isSaved: true } }
      const payload = { type: 'post', id: initialState.id, key: 'foo' }
      const action = resetAttribute(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('resetAttribute with many deletedAttributes', () => {
      const initialState = makePost({ meta: { deletedAttributes: ['foo', 'bar'], isSaved: false } })
      const expectedState = { ...initialState, meta: { isSaved: true } }
      const payload = { type: 'post', id: initialState.id, key: 'foo' }
      const action = resetAttribute(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('toggleAttribute', () => {
      const initialState = makePost({ attributes: { foo: true } })
      const expectedState = { ...initialState, meta: { changedAttributes: { foo: false }, isSaved: false } }
      const payload = { type: 'post', id: initialState.id, key: 'foo' }
      const action = toggleAttribute(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('toggleAttribute as only changedAttribute', () => {
      const initialState = makePost({
        attributes: { foo: true },
        meta: { changedAttributes: { foo: false }, isSaved: false }
      })
      const expectedState = { ...initialState, meta: { isSaved: true } }
      const payload = { type: 'post', id: initialState.id, key: 'foo' }
      const action = toggleAttribute(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('toggleAttribute with many changedAttributes', () => {
      const initialState = makePost({
        attributes: { foo: true, bar: 'old' },
        meta: { changedAttributes: { foo: false, bar: 'new' }, isSaved: false }
      })
      const expectedState = { ...initialState, meta: { changedAttributes: { bar: 'new' }, isSaved: false } }
      const payload = { type: 'post', id: initialState.id, key: 'foo' }
      const action = toggleAttribute(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('deleteAttribute', () => {
      const initialState = makePost({ attributes: { foo: true } })
      const expectedState = { ...initialState, meta: { deletedAttributes: ['foo'], isSaved: false } }
      const payload = { type: 'post', id: initialState.id, key: 'foo' }
      const action = deleteAttribute(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('deleteAttribute as only changedAttribute', () => {
      const initialState = makePost({
        attributes: { foo: true },
        meta: { changedAttributes: { foo: false } }
      })
      const expectedState = {
        ...initialState,
        meta: { deletedAttributes: ['foo'], isSaved: false }
      }
      const payload = { type: 'post', id: initialState.id, key: 'foo' }
      const action = deleteAttribute(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('deleteAttribute with many changedAttributes', () => {
      const initialState = makePost({
        attributes: { foo: true, bar: 'old' },
        meta: { changedAttributes: { foo: false, bar: 'new' } }
      })
      const expectedState = {
        ...initialState,
        meta: { changedAttributes: { bar: 'new' }, deletedAttributes: ['foo'], isSaved: false }
      }
      const payload = { type: 'post', id: initialState.id, key: 'foo' }
      const action = deleteAttribute(payload)
      const state = itemReducer(initialState, action)
      expect(state).toEqual(expectedState)
    })
  })
})
