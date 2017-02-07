import { selectValueByKey } from './'

// allow for setting the default root selector by type
const __DEFAULT_ROOT_SELECTOR__ = '@@redux-data/__DEFAULT__'
const rootSelectorsByType = {
  [__DEFAULT_ROOT_SELECTOR__]: state => type => state[type]
}

export const setCollectionRootSelector = (type, reducer) => {
  rootSelectorsByType[type] = reducer
}

export const selectCollectionByType = state => type => {
  const selector = rootSelectorsByType[type]
  if (!selector) {
    return rootSelectorsByType[__DEFAULT_ROOT_SELECTOR__](state)(type)
  }
  return selector(state)
}

export const selectCollectionData = (collection) => selectValueByKey(collection)('data')
export const selectCollectionMeta = (collection) => selectValueByKey(collection)('meta')

export const selectCollectionIsLoading = state => type => {
  const collection = selectCollectionByType(state)(type)
  const meta = selectCollectionMeta(collection)
  return selectValueByKey(meta)('isLoading')
}

export const selectCollectionIsLoaded = state => type => {
  const collection = selectCollectionByType(state)(type)
  const meta = selectCollectionMeta(collection)
  return selectValueByKey(meta)('isLoading')
}
