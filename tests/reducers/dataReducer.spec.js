import dataReducer from 'reducers/collection/dataReducer'
import { createNew } from 'actions/itemActions'
import { concat, filter, map, push, reverse, slice, sort, splice, unshift } from 'actions/collectionActions'

import data from '../../exampleData/posts.json'

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
const options = undefined
// options = { relationships: { author: { isOne: true, accepts: ['person'] } } }

describe('Reducers', () => {
  describe('dataReducer', () => {
    it('returns reducer function for dataReducer()', () => {
      const reducer = dataReducer('name')
      expect(typeof reducer).toBe('function')
    })

    it('returns empty state for dataReducer()()', () => {
      const expectedState = []
      const state = dataReducer()()
      expect(state).toEqual(expectedState)
    })

    describe('createNew', () => {
      const payload = { type: 'post', data: makePost() }
      const initialState = data
      const expectedState = [...data, payload.data]
      const action = createNew(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('concat one item', () => {
      const payload = { type: 'post', data: makePost() }
      const initialState = data
      const expectedState = [...data, payload.data]
      const action = concat(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('concat many items', () => {
      const payload = { type: 'post', data: [makePost(), makePost()] }
      const initialState = data
      const expectedState = [...data, ...payload.data]
      const action = concat(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('filter items', () => {
      const payload = {
        type: 'post',
        func: p => p.attributes.name === 'Second Post'
      }
      const initialState = data
      const expectedState = [data[1]]
      const action = filter(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('map items', () => {
      const payload = {
        type: 'post',
        func: p => {
          const newPost = {
            ...p,
            meta: { ...p.meta, mapped: true }
          }
          return newPost
        }
      }
      const initialState = data
      const action = map(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state.every(p => p.meta.mapped)).toBe(true)
    })

    it('push one item', () => {
      const payload = { type: 'post', data: makePost() }
      const initialState = data
      const expectedState = [...data, payload.data]
      const action = push(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('push many items', () => {
      const payload = { type: 'post', data: [makePost(), makePost(), makePost()] }
      const initialState = data
      const expectedState = [...data, ...payload.data]
      const action = push(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('reverse items', () => {
      const payload = { type: 'post' }
      const initialState = data
      const expectedState = [...data].reverse()
      const action = reverse(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('slice items', () => {
      const payload = { type: 'post', options: { begin: 0, end: 1 } }
      const initialState = data
      const expectedState = [data[0]]
      const action = slice(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('sort items', () => {
      const payload = {
        type: 'post',
        func (a, b) {
          if (a.attributes.order < b.attributes.order) {
            return -1
          }
          if (a.attributes.order > b.attributes.order) {
            return 1
          }
          return 0
        }
      }
      const initialState = [
        makePost({ attributes: { order: 2 } }),
        makePost({ attributes: { order: 1 } }),
        makePost({ attributes: { order: 0 } })
      ]
      const expectedState = [initialState[2], initialState[1], initialState[0]]
      const action = sort(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('splice to insert no items', () => {
      const payload = { type: 'post', options: { start: 1, deleteCount: 0 } }
      const initialState = data
      const expectedState = [...data]
      const action = splice(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('splice to delete one item', () => {
      const payload = { type: 'post', options: { start: 0, deleteCount: 1 } }
      const initialState = data
      const expectedState = [data[1]]
      const action = splice(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('splice to insert one item', () => {
      const payload = { type: 'post', options: { start: 1, deleteCount: 0 }, data: makePost() }
      const initialState = data
      const expectedState = [data[0], payload.data, data[1]]
      const action = splice(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('splice to insert many items', () => {
      const payload = { type: 'post', options: { start: 1, deleteCount: 0 }, data: [makePost(), makePost()] }
      const initialState = data
      const expectedState = [data[0], ...payload.data, data[1]]
      const action = splice(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('unshift one item', () => {
      const payload = { type: 'post', data: makePost() }
      const initialState = data
      const expectedState = [payload.data, ...data]
      const action = unshift(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })

    it('unshift many items', () => {
      const payload = { type: 'post', data: [makePost(), makePost()] }
      const initialState = data

      const expectedState = [...payload.data, ...data]
      const action = unshift(payload)
      const reducer = dataReducer('post', options)
      const state = reducer(initialState, action)
      expect(state).toEqual(expectedState)
    })
  })
})
