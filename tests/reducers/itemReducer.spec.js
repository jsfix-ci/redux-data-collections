import itemReducer from 'reducers/itemReducer'
import {
  // createNew,
  save,
  // reload,
  // deleteItem,
  // destroyItem,
  mapAttributes,
  rollbackAttributes,
  setAttributes,
  setAttribute,
  resetAttribute,
  toggleAttribute,
  deleteAttribute
} from 'actions/itemActions'

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
  })

  // TODO: save new item
  describe('save', () => {
    const initialState = makePost({
      attributes: {
        name: 'Original value'
      },
      meta: {
        changedAttributes: {
          name: 'New Value'
        },
        isSaved: false
      }
    })
    const expectedState = {
      ...initialState,
      attributes: {
        name: 'New Value'
      },
      meta: {
        changedAttributes: {},
        isSaved: true
      }
    }

    const payload = { type: 'post', id: initialState.id }
    const action = save(payload)
    const state = itemReducer(initialState, action)
    expect(state).toEqual(expectedState)
  })

  // TODO: this means reload from middleware
  // describe('reload', () => {
  //   const initialState = makePost()
  //   const expectedState = {...initialState}
  //   const payload = { type: 'post', id: initialState.id }
  //   const action = reload(payload)
  //   const state = itemReducer(initialState, action)
  //   expect(state).toEqual(expectedState)
  // })

  // TODO: this means delete item from middleware
  // describe('deleteItem', () => {
  //   const initialState = makePost()
  //   const expectedState = {...initialState}
  //   const payload = { type: 'post', id: initialState.id }
  //   const action = deleteItem(payload)
  //   const state = itemReducer(initialState, action)
  //   expect(state).toEqual(expectedState)
  // })

  // TODO: this should happen in the list
  // describe('destroyItem', () => {
  //   const initialState = makePost()
  //   const expectedState = {...initialState}
  //   const payload = { type: 'post', id: initialState.id }
  //   const action = destroyItem(payload)
  //   const state = itemReducer(initialState, action)
  //   expect(state).toEqual(expectedState)
  // })

  describe('mapAttributes', () => {
    const initialState = makePost({ attributes: { name: 'Something' } })
    const expectedState = { ...initialState, attributes: { name: true } }
    const payload = { type: 'post', id: initialState.id, map: (value, key, state) => true }
    const action = mapAttributes(payload)
    const state = itemReducer(initialState, action)
    expect(state).toEqual(expectedState)
  })

  describe('rollbackAttributes', () => {
    const initialState = makePost({
      attributes: { name: 'Old' },
      meta: { changedAttributes: { name: 'New' }, isSaved: false }
    })
    const expectedState = {
      ...initialState,
      meta: { changedAttributes: {}, isSaved: false }
    }
    const payload = { type: 'post', id: initialState.id }
    const action = rollbackAttributes(payload)
    const state = itemReducer(initialState, action)
    expect(state).toEqual(expectedState)
  })

  describe('setAttributes', () => {
    const initialState = makePost({ attributes: { name: 'Old' } })
    const payload = { type: 'post', id: initialState.id, attributes: { name: 'New', description: 'Something' } }
    const expectedState = {
      ...initialState,
      meta: { changedAttributes: payload.attributes, isSaved: false }
    }
    const action = setAttributes(payload)
    const state = itemReducer(initialState, action)
    expect(state).toEqual(expectedState)
  })

  // TODO: set attribute
  describe('setAttribute', () => {
    const initialState = makePost()
    const expectedState = { ...initialState, meta: { changedAttributes: { foo: 'bar' }, isSaved: false } }
    const payload = { type: 'post', id: initialState.id, attribute: 'foo', value: 'bar' }
    const action = setAttribute(payload)
    const state = itemReducer(initialState, action)
    expect(state).toEqual(expectedState)
  })

  describe('resetAttribute', () => {
    const initialState = makePost({ meta: { changedAttributes: { foo: 'bar' }, isSaved: false } })
    const expectedState = { ...initialState, meta: { changedAttributes: {}, isSaved: true } }
    const payload = { type: 'post', id: initialState.id, attribute: 'foo' }
    const action = resetAttribute(payload)
    const state = itemReducer(initialState, action)
    expect(state).toEqual(expectedState)
  })

  describe('toggleAttribute', () => {
    const initialState = makePost({ attributes: { foo: true } })
    const expectedState = { ...initialState, meta: { changedAttributes: { foo: false }, isSaved: false } }
    const payload = { type: 'post', id: initialState.id, attribute: 'foo' }
    const action = toggleAttribute(payload)
    const state = itemReducer(initialState, action)
    expect(state).toEqual(expectedState)
  })

  describe('deleteAttribute', () => {
    const initialState = makePost({ attributes: { foo: true } })
    const expectedState = { ...initialState, meta: { deletedAttributes: ['foo'], isSaved: false } }
    const payload = { type: 'post', id: initialState.id, attribute: 'foo' }
    const action = deleteAttribute(payload)
    const state = itemReducer(initialState, action)
    expect(state).toEqual(expectedState)
  })
})
