import resolve from 'object-resolve-path'
import {
  selectItemById,
  selectRawItemAttributes,
  selectRawAttributes,
  selectItemChangedAttributes,
  selectChangedAttributes,
  selectItemAttributes,
  selectAttributes,
  selectItemAttributeByName,
  selectAttributeByName,
  selectItemRawAttributeByName,
  selectRawAttributeByName,
  selectItemChangedAttributeByName,
  selectChangedAttributeByName,
  selectItemRelationships,
  selectRelationships,
  selectItemRelationshipByName,
  selectRelationshipByName,
  selectRelationshipDataByName,
  selectRelationshipRawDataByName,
  selectRelationshipChangeDataByName,
  selectRelationshipData,
  selectRelationshipRawData,
  selectRelationshipChangedData
} from 'selectors/item'

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

const makePosts = () => [makePost(), makePost(), makePost()]

const makeState = () => ({
  posts: {
    data: makePosts(),
    meta: {}
  }
})

describe('Selectors', () => {
  describe('itemSelectors', () => {
    it('selectItemById', () => {
      const state = makeState()
      const id = resolve(state, 'posts.data[1].id')
      const type = resolve(state, 'posts.data[1].type')
      const collection = state.posts
      const item = selectItemById(collection)(type, id)
      expect(item.id).toEqual(id)
    })

    it('selectRawItemAttributes', () => {
      const state = makeState()
      const id = resolve(state, 'posts.data[1].id')
      const type = resolve(state, 'posts.data[1].type')
      const collection = state.posts
      const actual = selectRawItemAttributes(collection)(type, id)
      const expected = resolve(state, 'posts.data[1].attributes')
      expect(actual).toEqual(expected)
    })

    it('selectRawAttributes', () => {
      const item = makePost({ attributes: { name: 'test' } })
      const actual = selectRawAttributes(item)
      const expected = resolve(item, 'attributes')
      expect(actual).toEqual(expected)
    })

    it('selectItemChangedAttributes', () => {
      const state = makeState()
      state.posts.data.push(makePost({
        attributes: { name: 'test' },
        meta: { changedAttributes: { name: 'changed' } }
      }))
      const id = resolve(state, 'posts.data[3].id')
      const type = resolve(state, 'posts.data[3].type')
      const collection = state.posts
      const actual = selectItemChangedAttributes(collection)(type, id)
      const expected = resolve(state, 'posts.data[3].meta.changedAttributes')
      expect(actual).toEqual(expected)
    })

    it('selectChangedAttributes', () => {
      const item = makePost({
        attributes: { name: 'test' },
        meta: { changedAttributes: { name: 'changed' } }
      })
      const actual = selectChangedAttributes(item)
      const expected = resolve(item, 'meta.changedAttributes')
      expect(actual).toEqual(expected)
    })

    it('selectItemAttributes without changedAttributes', () => {
      const state = makeState()
      state.posts.data.push(makePost({
        attributes: { name: 'test' }
      }))
      const id = resolve(state, 'posts.data[3].id')
      const type = resolve(state, 'posts.data[3].type')
      const collection = state.posts
      const actual = selectItemAttributes(collection)(type, id)
      const expected = resolve(state, 'posts.data[3].attributes')
      expect(actual).toEqual(expected)
    })

    it('selectItemAttributes with changedAttributes', () => {
      const state = makeState()
      state.posts.data.push(makePost({
        attributes: { name: 'test' },
        meta: { changedAttributes: { name: 'changed' } }
      }))
      const id = resolve(state, 'posts.data[3].id')
      const type = resolve(state, 'posts.data[3].type')
      const collection = state.posts
      const actual = selectItemAttributes(collection)(type, id)
      const expected = resolve(state, 'posts.data[3].meta.changedAttributes')
      expect(actual).toEqual(expected)
    })

    it('selectAttributes without changedAttributes', () => {
      const item = makePost({
        attributes: { name: 'test' }
      })
      const actual = selectAttributes(item)
      const expected = resolve(item, 'attributes')
      expect(actual).toEqual(expected)
    })

    it('selectAttributes with changedAttributes', () => {
      const item = makePost({
        attributes: { name: 'test' },
        meta: { changedAttributes: { name: 'changed' } }
      })
      const actual = selectAttributes(item)
      const expected = resolve(item, 'meta.changedAttributes')
      expect(actual).toEqual(expected)
    })

    it('selectItemAttributeByName without changedAttributes', () => {
      const state = makeState()
      state.posts.data.push(makePost({
        attributes: { name: 'test' }
      }))
      const id = resolve(state, 'posts.data[3].id')
      const type = resolve(state, 'posts.data[3].type')
      const name = 'name'
      const collection = state.posts
      const actual = selectItemAttributeByName(collection)(type, id, name)
      const expected = resolve(state, `posts.data[3].attributes['${name}']`)
      expect(actual).toEqual(expected)
    })

    it('selectItemAttributeByName with changedAttributes', () => {
      const state = makeState()
      state.posts.data.push(makePost({
        attributes: { name: 'test' },
        meta: { changedAttributes: { name: 'changed' } }
      }))
      const id = resolve(state, 'posts.data[3].id')
      const type = resolve(state, 'posts.data[3].type')
      const name = 'name'
      const collection = state.posts
      const actual = selectItemAttributeByName(collection)(type, id, name)
      const expected = resolve(state, `posts.data[3].meta.changedAttributes['${name}']`)
      expect(actual).toEqual(expected)
    })

    it('selectAttributeByName without changedAttributes', () => {
      const item = makePost({
        attributes: { name: 'test' }
      })
      const name = 'name'
      const actual = selectAttributeByName(item)(name)
      const expected = resolve(item, `attributes['${name}']`)
      expect(actual).toEqual(expected)
    })

    it('selectAttributeByName with changedAttributes', () => {
      const item = makePost({
        attributes: { name: 'test' },
        meta: { changedAttributes: { name: 'changed' } }
      })
      const name = 'name'
      const actual = selectAttributeByName(item)(name)
      const expected = resolve(item, `meta.changedAttributes['${name}']`)
      expect(actual).toEqual(expected)
    })

    it('selectItemRawAttributeByName', () => {
      const state = makeState()
      state.posts.data.push(makePost({
        attributes: { name: 'test' },
        meta: { changedAttributes: { name: 'changed' } }
      }))
      const id = resolve(state, 'posts.data[3].id')
      const type = resolve(state, 'posts.data[3].type')
      const name = 'name'
      const collection = state.posts
      const actual = selectItemRawAttributeByName(collection)(type, id, name)
      const expected = resolve(state, `posts.data[3].attributes['${name}']`)
      expect(actual).toEqual(expected)
    })

    it('selectRawAttributeByName', () => {
      const item = makePost({
        attributes: { name: 'test' },
        meta: { changedAttributes: { name: 'changed' } }
      })
      const name = 'name'
      const actual = selectRawAttributeByName(item)(name)
      const expected = resolve(item, `attributes['${name}']`)
      expect(actual).toEqual(expected)
    })

    it('selectItemChangedAttributeByName', () => {
      const state = makeState()
      state.posts.data.push(makePost({
        attributes: { name: 'test' },
        meta: { changedAttributes: { name: 'changed' } }
      }))
      const id = resolve(state, 'posts.data[3].id')
      const type = resolve(state, 'posts.data[3].type')
      const name = 'name'
      const collection = state.posts
      const actual = selectItemChangedAttributeByName(collection)(type, id, name)
      const expected = resolve(state, `posts.data[3].meta.changedAttributes['${name}']`)
      expect(actual).toEqual(expected)
    })

    it('selectChangedAttributeByName', () => {
      const item = makePost({
        attributes: { name: 'test' },
        meta: { changedAttributes: { name: 'changed' } }
      })
      const name = 'name'
      const actual = selectChangedAttributeByName(item)(name)
      const expected = resolve(item, `meta.changedAttributes['${name}']`)
      expect(actual).toEqual(expected)
    })

    it('selectItemRelationships', () => {
      const state = makeState()
      state.posts.data.push(makePost({
        relationships: {
          comments: { data: [{ type: 'comment', id: 'test-comment-id-1' }] }
        }
      }))
      const id = resolve(state, 'posts.data[3].id')
      const type = resolve(state, 'posts.data[3].type')
      const collection = state.posts
      const actual = selectItemRelationships(collection)(type, id)
      const expected = resolve(state, 'posts.data[3].relationships')
      expect(actual).toEqual(expected)
    })

    it('selectItemRelationshipByName', () => {
      const state = makeState()
      state.posts.data.push(makePost({
        relationships: {
          comments: { data: [{ type: 'comment', id: 'test-comment-id-1' }] }
        }
      }))
      const id = resolve(state, 'posts.data[3].id')
      const type = resolve(state, 'posts.data[3].type')
      const name = 'comments'
      const collection = state.posts
      const actual = selectItemRelationshipByName(collection)(type, id, name)
      const expected = resolve(state, `posts.data[3].relationships['${name}']`)
      expect(actual).toEqual(expected)
    })

    it('selectRelationshipByName', () => {
      const relationships = selectRelationships(makePost({
        relationships: {
          comments: { data: [{ type: 'comment', id: 'test-comment-id-1' }] }
        }
      }))
      const name = 'comments'
      const actual = selectRelationshipByName(relationships)(name)
      const expected = resolve(relationships, `['${name}']`)
      expect(actual).toEqual(expected)
    })

    it('selectRelationshipDataByName without changedData', () => {
      const relationships = selectRelationships(makePost({
        relationships: {
          comments: { data: [{ type: 'comment', id: 'test-comment-id-1' }] }
        }
      }))
      const name = 'comments'
      const actual = selectRelationshipDataByName(relationships)(name)
      const expected = resolve(relationships, `['${name}'].data`)
      expect(actual).toEqual(expected)
    })

    it('selectRelationshipDataByName with changedData', () => {
      const relationships = selectRelationships(makePost({
        relationships: {
          comments: {
            data: [{ type: 'comment', id: 'test-comment-id-1' }],
            meta: { changedData: [
              { type: 'comment', id: 'test-comment-id-1' },
              { type: 'comment', id: 'test-comment-id-2' }
            ] }
          }
        }
      }))
      const name = 'comments'
      const actual = selectRelationshipDataByName(relationships)(name)
      const expected = resolve(relationships, `['${name}'].meta.changedData`)
      expect(actual).toEqual(expected)
    })

    it('selectRelationshipRawDataByName', () => {
      const relationships = selectRelationships(makePost({
        relationships: {
          comments: {
            data: [{ type: 'comment', id: 'test-comment-id-1' }],
            meta: { changedData: [
              { type: 'comment', id: 'test-comment-id-1' },
              { type: 'comment', id: 'test-comment-id-2' }
            ] }
          }
        }
      }))
      const name = 'comments'
      const actual = selectRelationshipRawDataByName(relationships)(name)
      const expected = resolve(relationships, `['${name}'].data`)
      expect(actual).toEqual(expected)
    })

    it('selectRelationshipChangeDataByName', () => {
      const relationships = selectRelationships(makePost({
        relationships: {
          comments: {
            data: [{ type: 'comment', id: 'test-comment-id-1' }],
            meta: { changedData: [
              { type: 'comment', id: 'test-comment-id-1' },
              { type: 'comment', id: 'test-comment-id-2' }
            ] }
          }
        }
      }))
      const name = 'comments'
      const actual = selectRelationshipChangeDataByName(relationships)(name)
      const expected = resolve(relationships, `['${name}'].meta.changedData`)
      expect(actual).toEqual(expected)
    })

    it('selectRelationshipData without changedData', () => {
      const relationship = {
        data: [{ type: 'comment', id: 'test-comment-id-1' }]
      }
      const actual = selectRelationshipData(relationship)
      const expected = resolve(relationship, 'data')
      expect(actual).toEqual(expected)
    })

    it('selectRelationshipData with changedData', () => {
      const relationship = {
        data: [{ type: 'comment', id: 'test-comment-id-1' }],
        meta: { changedData: [
          { type: 'comment', id: 'test-comment-id-1' },
          { type: 'comment', id: 'test-comment-id-2' }
        ] }
      }
      const actual = selectRelationshipData(relationship)
      const expected = resolve(relationship, 'meta.changedData')
      expect(actual).toEqual(expected)
    })

    it('selectRelationshipRawData', () => {
      const relationship = {
        data: [{ type: 'comment', id: 'test-comment-id-1' }],
        meta: { changedData: [
          { type: 'comment', id: 'test-comment-id-1' },
          { type: 'comment', id: 'test-comment-id-2' }
        ] }
      }
      const actual = selectRelationshipRawData(relationship)
      const expected = resolve(relationship, 'data')
      expect(actual).toEqual(expected)
    })

    it('selectRelationshipChangedData', () => {
      const relationship = {
        data: [{ type: 'comment', id: 'test-comment-id-1' }],
        meta: { changedData: [
          { type: 'comment', id: 'test-comment-id-1' },
          { type: 'comment', id: 'test-comment-id-2' }
        ] }
      }
      const actual = selectRelationshipChangedData(relationship)
      const expected = resolve(relationship, 'meta.changedData')
      expect(actual).toEqual(expected)
    })
  })
})
