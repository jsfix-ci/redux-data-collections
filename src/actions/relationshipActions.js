import { createStandardAction } from './'

// TODO: each action should have a "raw" version for acting directly instead of staging changes in the meta
import {
  RELATIONSHIP_RESET,
  RELATIONSHIP_ONE_SET,
  RELATIONSHIP_ONE_DELETE,
  RELATIONSHIP_MANY_DELETE,
  RELATIONSHIP_MANY_CONCAT,
  RELATIONSHIP_MANY_FILTER,
  RELATIONSHIP_MANY_MAP,
  RELATIONSHIP_MANY_PUSH,
  RELATIONSHIP_MANY_REVERSE,
  RELATIONSHIP_MANY_SLICE,
  RELATIONSHIP_MANY_SORT,
  RELATIONSHIP_MANY_SPLICE,
  RELATIONSHIP_MANY_UNSHIFT
} from '../constants/relationshipConstants'

// like: concat({ type: 'post', key: 'comments', data: [{ type: 'comment', id: 'comment-id-1' }] })
// like: push({ type: 'post', key: 'comments', data: { type: 'comment', id: 'comment-id-1' } })
// like: push({ type: 'post', key: 'comments', data: [{ type: 'comment', id: 'comment-id-1' }] })
// like: set({ type: 'post', key: 'author', data: { type: 'author', id: 'author-id-1' } })

// { type, relationship, [relationship] }
export const set = createStandardAction(RELATIONSHIP_ONE_SET)

// reset a relationship, one or many
// { type, relationship }
export const reset = createStandardAction(RELATIONSHIP_RESET)

// delete a single relationship
// { type, relationship }
export const deleteOne = createStandardAction(RELATIONSHIP_ONE_DELETE)

// delete a relationship from a many array
// { type, relationship, [relationship] }
export const deleteRelationship = createStandardAction(RELATIONSHIP_MANY_DELETE)

// { type, relationship, [relationships] }
export const concat = createStandardAction(RELATIONSHIP_MANY_CONCAT)

// { type, relationship, filter: func }
export const filter = createStandardAction(RELATIONSHIP_MANY_FILTER)

// { type, relationship, map: func }
export const map = createStandardAction(RELATIONSHIP_MANY_MAP)

// { type, relationship, [relationship] || [relationships] }
export const push = createStandardAction(RELATIONSHIP_MANY_PUSH)

// { type, relationship }
export const reverse = createStandardAction(RELATIONSHIP_MANY_REVERSE)

// { type, relationship }
export const slice = createStandardAction(RELATIONSHIP_MANY_SLICE)

// { type, relationship }
export const sort = createStandardAction(RELATIONSHIP_MANY_SORT)

// { type, relationship }
export const splice = createStandardAction(RELATIONSHIP_MANY_SPLICE)

// { type, relationship }
export const unshift = createStandardAction(RELATIONSHIP_MANY_UNSHIFT)
