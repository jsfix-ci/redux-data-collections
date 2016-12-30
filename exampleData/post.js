
const relationships = {
  author: {
    data: { type: 'person', id: 'test-person-id-1' },
    meta: {
      changedData: { type: 'person', id: 'test-person-id-2' },
      isDeleted: false
    }
  },
  comments: {
    data: [
      { type: 'comment', id: 'test-comment-id-1' },
      { type: 'comment', id: 'test-comment-id-2' }
    ],
    meta: {
      changedData: [{ type: 'comment', id: 'test-comment-id-2' }],
      isDeleted: false
    }
  }
}

const attributes = {
  title: 'Original value',
  description: ''
}
const meta = {
  changedAttributes: {
    title: 'New value'
  },
  deletedAttributes: ['description']
}

const post = {
  id: 'example-post-id-1',
  type: 'post',
  attributes,
  relationships,
  meta
}

export default post
