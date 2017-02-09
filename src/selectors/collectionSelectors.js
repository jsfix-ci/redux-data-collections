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
    const set = selectSet(state)({ type, key, options }).data
    return set.map(({ type, id }) => data.find(item => item.type === type && item.id === id))
  }
  return data
}

export const selectSet = state => ({ type, key, options }) => {
  const collection = selectRootOfType(state)(type)
  const meta = selectCollectionMeta(collection)
  const { sets } = meta
  if (!sets) { return }
  return sets[key]
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
