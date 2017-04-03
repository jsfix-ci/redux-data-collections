import { selectValueByKey } from './'
import { selectMetaKey } from './item'
import { makeSetKey } from '../utils/makeSetkey'
import { pluralize } from 'inflection'

// allow for setting the default root selector by type
// TODO: this doesn't work as expected
export const __DEFAULT_ROOT_SELECTOR__ = '@@redux-data-collections/__DEFAULT__'
export const rootSelectorsByType = {
  [__DEFAULT_ROOT_SELECTOR__]: state => type => state[type] || state[pluralize(type)]
}

const filterItemIsDeleted = item => !selectMetaKey(item)('isDeleted')

export const setCollectionRootSelector = (type, selector) => {
  rootSelectorsByType[type] = selector
}

export const selectRootOfType = state => type => {
  const selector = rootSelectorsByType[type]
  if (!selector) {
    return rootSelectorsByType[__DEFAULT_ROOT_SELECTOR__](state)(type)
  }
  return selector(state)(type)
}

export const selectItems = state => ({ type, key, options }) => {
  const data = selectRawItems(state)({ type, key, options })
  return data.filter(filterItemIsDeleted)
}

export const selectRawItems = state => ({ type, key, options }) => {
  const collection = selectRootOfType(state)(type)
  const data = selectCollectionData(collection)
  if (key) {
    let set
    if (options && options.page) {
      set = selectSetItems(state)({ type, key, options })
    } else {
      set = selectFullSetItems(state)({ type, key, options })
    }
    if (!set) { return [] }
    return set.map(({ type, id }) => data.find(item => item.type === type && item.id === id))
  }
  return data
}

export const selectSet = state => ({ type, key, options }) => {
  const collection = selectRootOfType(state)(type)
  const meta = selectCollectionMeta(collection)
  const { sets } = meta
  if (!sets) { return }
  key = makeSetKey(key, options)
  const set = sets[key]
  if (!set) { return }
  let page = '1'
  if (options && options.page) { page = `${options.page}` }
  return set[page]
}

// retrieve a single page
export const selectSetItems = state => ({ type, key, options }) => {
  const { data } = selectSet(state)({ type, key, options })
  return data
}

// merge all pages into one big collection
export const selectFullSetItems = state => ({ type, key, options }) => {
  const collection = selectRootOfType(state)(type)
  const meta = selectCollectionMeta(collection)
  const { sets } = meta
  if (!sets) { return }
  key = makeSetKey(key, options)
  const set = sets[key]
  if (!set) { return }
  const items = Object.keys(set).sort((a, b) => a - b).reduce((list, page) => {
    const setPage = set[page]
    const { data } = setPage
    if (data) { return list.concat(data) }
    return list
  }, [])
  return items
}

export const selectLastLoadedPageNum = state => ({ type, key, options }) => {
  const collection = selectRootOfType(state)(type)
  const collectionMeta = selectCollectionMeta(collection)
  const { sets } = collectionMeta
  if (!sets) { return }
  key = makeSetKey(key, options)
  const set = sets[key]
  if (!set) { return 0 }
  return Object.keys(set).sort((a, b) => a - b).reverse()[0]
}

export const selectIsLoaded = state => ({ type, key, options }) => {
  let meta
  if (key) {
    // NOTE: selectSet returns by page
    // TODO: should return sets[key].meta.isLoading
    // TODO: should return sets[key].data[page].meta.isLoading
    // NOTE: would need to rework how sets are stored to support this
    const set = selectSet(state)({ type, key, options })
    meta = selectValueByKey(set)('meta')
  } else {
    const collection = selectRootOfType(state)(type)
    meta = selectCollectionMeta(collection)
  }
  return selectValueByKey(meta)('isLoaded')
}

export const selectIsLoading = state => ({ type, key, options }) => {
  let meta
  if (key) {
    const set = selectSet(state)({ type, key, options })
    meta = selectValueByKey(set)('meta')
  } else {
    const collection = selectRootOfType(state)(type)
    meta = selectCollectionMeta(collection)
  }
  return selectValueByKey(meta)('isLoading')
}

// ----

export const selectCollectionData = (collection) => selectValueByKey(collection)('data')
export const selectCollectionMeta = (collection) => selectValueByKey(collection)('meta')

export const selectCollectionIsLoading = state => type => {
  const collection = selectRootOfType(state)(type)
  const meta = selectCollectionMeta(collection)
  return selectValueByKey(meta)('isLoading')
}

export const selectCollectionIsLoaded = state => type => {
  const collection = selectRootOfType(state)(type)
  const meta = selectCollectionMeta(collection)
  return selectValueByKey(meta)('isLoading')
}
