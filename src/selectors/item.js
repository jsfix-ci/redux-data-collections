import { selectData, selectMeta } from './'
import { selectItems } from './collection'
import get from 'lodash.get'

// payload: { type, id, key, options }
export const selectItem = state => payload => {
  const { type, id, options } = payload
  const items = selectItems(state)(payload)
  if (!Array.isArray(items)) { return undefined }
  if (!id && options) {
    const { slug } = options
    return items.find(item => {
      const value = selectRawAttributeByName(item)('slug')
      return value === slug
    })
  }
  return items.find(item => item.type === type && item.id === id)
}

// payload: { type, key, value}
export const selectItemByAttribute = state => payload => {
  const { type, key, value } = payload
  const items = selectItems(state)({ type })
  return items.find(item => {
    const attribute = selectAttribute(item)(key)
    return attribute === value
  })
}

export const selectItemIsLoading = state => payload => {
  const item = selectItem(state)(payload)
  const meta = selectMeta(item)
  return get(meta, 'isLoading')
}

export const selectItemIsLoaded = state => payload => {
  const item = selectItem(state)(payload)
  const meta = selectMeta(item)
  return get(meta, 'IsLoaded')
}

export const selectItemAttribute = state => payload => {
  const item = selectItem(state)(payload)
  const { key } = payload
  return selectAttribute(item)(key)
}

export const selectAttribute = item => key => {
  const attributes = selectAttributes(item)
  return get(attributes, key)
}

export const selectItemMetaKey = state => payload => {
  const item = selectItem(state)(payload)
  const { key } = payload
  return selectMetaKey(item)(key)
}

export const selectMetaKey = item => key => {
  const meta = selectMeta(item)
  return get(meta, key)
}

// --- older, may not be as useful

export const selectItemById = (state) => (type, id) => {
  const items = selectItems(state)({ type })
  if (!Array.isArray(items)) { return undefined }
  return items.find(item => item.type === type && item.id === id)
}

export const selectRawItemAttributes = (state) => (type, id) => {
  const item = selectItemById(state)(type, id)
  return selectRawAttributes(item)
}

export const selectRawAttributes = (item) => get(item, 'attributes')

export const selectItemChangedAttributes = (state) => (type, id) => {
  const item = selectItemById(state)(type, id)
  return selectChangedAttributes(item)
}

export const selectChangedAttributes = (item) => {
  const meta = selectMeta(item)
  return get(meta, 'changedAttributes')
}

export const selectItemAttributes = (state) => (type, id) => {
  const item = selectItemById(state)(type, id)
  return selectAttributes(item)
}

export const selectAttributes = (item) => {
  const rawAttributes = selectRawAttributes(item)
  const changedAttributes = selectChangedAttributes(item)
  return { ...rawAttributes, ...changedAttributes }
}

export const selectItemAttributeByName = (state) => (type, id, name) => {
  const item = selectItemById(state)(type, id)
  return selectAttributeByName(item)(name)
}

export const selectAttributeByName = (item) => (name) => {
  const attributes = selectAttributes(item)
  return get(attributes, name)
}

export const selectItemRawAttributeByName = (state) => (type, id, name) => {
  const item = selectItemById(state)(type, id)
  return selectRawAttributeByName(item)(name)
}

export const selectRawAttributeByName = (item) => (name) => {
  const attributes = selectRawAttributes(item)
  return get(attributes, name)
}

export const selectItemChangedAttributeByName = (state) => (type, id, name) => {
  const item = selectItemById(state)(type, id)
  return selectChangedAttributeByName(item)(name)
}

export const selectChangedAttributeByName = (item) => (name) => {
  const attributes = selectChangedAttributes(item)
  return get(attributes, name)
}

export const selectItemRelationships = (state) => (type, id) => {
  const item = selectItemById(state)(type, id)
  return selectRelationships(item)
}

// TODO: move to ./relationships
export const selectRelationships = (item) => {
  return get(item, 'relationships')
}

export const selectRelatedItems = state => (item, name) => {
  const relationships = selectRelationships(item)
  const identifiers = selectRelationshipDataByName(relationships)(name)
  return identifiers.map(identifier => selectItem(state)(identifier))
}

export const selectItemRelationshipByName = (state) => (type, id, name) => {
  const relationships = selectItemRelationships(state)(type, id)
  return selectRelationshipByName(relationships)(name)
}

export const selectRelationshipByName = (relationships) => (name) => get(relationships, name)

export const selectRelationshipDataByName = (relationships) => (name) => {
  const relationship = selectRelationshipByName(relationships)(name)
  return selectRelationshipData(relationship)
}

export const selectRelationshipRawDataByName = (relationships) => (name) => {
  const relationship = selectRelationshipByName(relationships)(name)
  return selectRelationshipRawData(relationship)
}

export const selectRelationshipChangeDataByName = (relationships) => (name) => {
  const relationship = selectRelationshipByName(relationships)(name)
  return selectRelationshipChangedData(relationship)
}

export const selectRelationshipData = (relationship) => {
  const data = selectData(relationship)
  const meta = selectMeta(relationship)
  const changedData = get(meta, 'changedData')
  return changedData || data
}

export const selectRelationshipRawData = (relationship) => selectData(relationship)

export const selectRelationshipChangedData = (relationship) => {
  const meta = selectMeta(relationship)
  return get(meta, 'changedData')
}
