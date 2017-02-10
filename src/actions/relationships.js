import { createStandardAction } from './'

// TODO: each action should have a "raw" version for acting directly instead of staging changes in the meta
import {
  RELATIONSHIP_RESET,

  // one
  RELATIONSHIP_ONE_SET,
  RELATIONSHIP_ONE_DELETE,

  // many
  RELATIONSHIP_MANY_SET,
  RELATIONSHIP_MANY_ADD,
  RELATIONSHIP_MANY_DELETE,

  // middleware
  RELATIONSHIP_ONE_FETCH,
  RELATIONSHIP_MANY_FETCH,

  // advanced
  RELATIONSHIP_MANY_CONCAT,
  RELATIONSHIP_MANY_FILTER,
  RELATIONSHIP_MANY_MAP,
  RELATIONSHIP_MANY_PUSH,
  RELATIONSHIP_MANY_REVERSE,
  RELATIONSHIP_MANY_SLICE,
  RELATIONSHIP_MANY_SORT,
  RELATIONSHIP_MANY_SPLICE,
  RELATIONSHIP_MANY_UNSHIFT
} from '../constants/relationships'

export const reset = createStandardAction(RELATIONSHIP_RESET)

// one
export const set = createStandardAction(RELATIONSHIP_ONE_SET)
export const deleteOne = createStandardAction(RELATIONSHIP_ONE_DELETE)

// many
export const setRelationship = createStandardAction(RELATIONSHIP_MANY_SET)
export const addRelationship = createStandardAction(RELATIONSHIP_MANY_ADD)
export const deleteRelationship = createStandardAction(RELATIONSHIP_MANY_DELETE)

// middleware
export const fetchOne = createStandardAction(RELATIONSHIP_ONE_FETCH)
export const fetchMany = createStandardAction(RELATIONSHIP_MANY_FETCH)

// advanced
export const concat = createStandardAction(RELATIONSHIP_MANY_CONCAT)
export const filter = createStandardAction(RELATIONSHIP_MANY_FILTER)
export const map = createStandardAction(RELATIONSHIP_MANY_MAP)
export const push = createStandardAction(RELATIONSHIP_MANY_PUSH)
export const reverse = createStandardAction(RELATIONSHIP_MANY_REVERSE)
export const slice = createStandardAction(RELATIONSHIP_MANY_SLICE)
export const sort = createStandardAction(RELATIONSHIP_MANY_SORT)
export const splice = createStandardAction(RELATIONSHIP_MANY_SPLICE)
export const unshift = createStandardAction(RELATIONSHIP_MANY_UNSHIFT)
