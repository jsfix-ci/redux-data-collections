import makeSelectors from '../utils/makeSelectors'
import { createEntitySelectors } from '../entity/selectors'
import { DEFAULT_COLLECTION_NAME, DEFAULT_QUERY_NAME } from './index'

// all

// expects state to be a collection
export const getAll = (state) => state.data
export const getAllPage = (state, num = 0) => state.meta.pages[num]

export const getCurrentPage = (state) => state.meta.page.offset
export const getAllNext = (state) => {
  const num = getCurrentPage(state) + 1
  return getAllPage(state, num)
}
export const getAllPrev = (state) => {
  const num = getCurrentPage(state) - 1
  return getAllPage(state, num)
}

export const getAllMeta = (state, key) => state.meta[key]
export const getAllMetaAttributes = (state) => state.meta
export const isLoadingAll = (state) => !!getAllMeta(state, 'loading')

// query
export const getQuery = (state, name = DEFAULT_QUERY_NAME) => state.queries[name]
export const getQueryPage = (state, name = DEFAULT_QUERY_NAME, num) => getQuery(state, name).meta.pages[num]

export const getQueryCurrentPage = (state, name = DEFAULT_QUERY_NAME) => getQuery(state, name).meta.page.offset
export const getQueryNext = (state, name = DEFAULT_QUERY_NAME) => {
  const num = getQueryCurrentPage(state) + 1
  return getQueryPage(state, num)
}
export const getQueryPrev = (state, name = DEFAULT_QUERY_NAME) => {
  const num = getQueryCurrentPage(state) - 1
  return getQueryPage(state, num)
}

export const getQueryMeta = (state, name, key) => getQuery(state, name).meta[key]
export const getQueryMetaAttributes = (state, name) => getQuery(state, name).meta
export const isLoadingQuery = (state, name) => !!getQueryMeta(state, name, 'loading')

export const makeQuerySelectors = (state, name = DEFAULT_QUERY_NAME) => {
  const querySelector = () => getQuery(state, name)
  const createQuerySelector = (selector) => (...args) => selector(state, name, ...args)
  return {
    getQuery: querySelector,
    ...makeSelectors(state, createQuerySelector, {
      getCurrentPage: getQueryCurrentPage,
      getPage: getQueryPage, // num
      getNext: getQueryNext,
      getPrev: getQueryPrev,
      getMeta: getQueryMeta, // key
      getMetaAttributes: getQueryMetaAttributes,
      isLoading: isLoadingQuery
    })
  }
}

/** usage
in a module:
  import { createCollectionSelectors } from 'redux-data/collection/selectors'

  export const baseSelector = (state) => state.api.todos
  export const makeCollectionSelectors = createCollectionSelectors('todos', { baseSelector })

in a container
  import { makeCollectionSelectors } from './modules/entities/todos'

  const mapStateToProps = (state, ownProps) => {
    const { getAll } = makeCollectionSelectors(state)
    return {
      todos: getAll()
    }
  }

also in a container
  import { collectionSelector } from './modules/entities/todos'
  import { createCollectionSelectors } from 'redux-data/collection/selectors'

  const mapStateToProps = (state, ownProps) => {
    const { getAll, ... } = createCollectionSelectors('todos', { baseSelector: collectionSelector })(state)
    return {
      todos: getAll()
    }
  }

also in a container
  import { collectionSelector } from './modules/entities/todos'
  import { getAll } from 'redux-data/collection/selectors'

  const mapStateToProps = (state, ownProps) => {
    return {
      todos: getAll(collectionSelector(state))
    }
  }
**/
export const createCollectionSelectors = (type, { name = DEFAULT_COLLECTION_NAME, baseSelector }) => {
  const collectionSelector = (state) => baseSelector(state).collections[type][name]
  const createSelector = (state, selector) => (...args) => selector(collectionSelector(state), ...args)

  return (state) => ({
    getCollection: () => collectionSelector(state),
    ...createEntitySelectors(getAll)(state),
    ...makeSelectors(state, createSelector, {
      getAll,
      getAllPage, // num
      getAllNext,
      getAllPrev,
      getAllMeta, // key
      getAllMetaAttributes,
      isLoadingAll,

      getQuery, // name
      getQueryCurrentPage, // name
      getQueryPage, // name, num
      getQueryNext, // name
      getQueryPrev, // name
      getQueryMeta, // name, key
      getQueryMetaAttributes, // name
      isLoadingQuery, // name
      makeQuerySelectors // name
    })
  })
}
