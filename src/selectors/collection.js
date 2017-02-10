import { selectValueByKey } from './'

// allow for setting the default root selector by type
const __DEFAULT_ROOT_SELECTOR__ = '@@redux-data/__DEFAULT__'
const rootSelectorsByType = {
  [__DEFAULT_ROOT_SELECTOR__]: state => type => state[type]
}

export const setCollectionRootSelector = (type, reducer) => {
  rootSelectorsByType[type] = reducer
}

export const selectRootOfType = state => type => {
  const selector = rootSelectorsByType[type]
  if (!selector) {
    return rootSelectorsByType[__DEFAULT_ROOT_SELECTOR__](state)(type)
  }
  return selector(state)
}

export const selectItems = state => ({ type, key, options }) => {
  const collection = selectRootOfType(state)(type)
  const data = selectCollectionData(collection)
  if (key) {
    let set
    if (options && options.page) {
      const page = selectSet({ type, key, options })
      set = page && page.data
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
  let page = '1'
  if (options && options.page) { page = `${options.page}` }
  const set = sets[key]
  if (!set) { return }
  return set[page]
}

export const selectFullSetItems = state => ({ type, key, options }) => {
  const collection = selectRootOfType(state)(type)
  const meta = selectCollectionMeta(collection)
  const { sets } = meta
  if (!sets) { return }
  const set = sets[key]
  if (!set) { return }
  const items = Object.keys(set).sort().reduce((list, page) => {
    const setPage = set[page]
    const { data } = setPage
    if (data) { return list.concat(data) }
    return list
  }, [])
  return items
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
