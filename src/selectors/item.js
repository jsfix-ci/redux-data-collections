import { selectValueByKey, selectData, selectMeta, selectId, selectType } from './'
import { selectItems } from './collection'
import get from 'lodash.get'

// TODO: move to a more generic location

// payload: { type, id, key, options }
export const selectItem = (state) => (payload) => {
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

export const selectItemIsLoading = state => payload => {
  const item = selectItem(state)(payload)
  const meta = selectMeta(item)
  return selectValueByKey(meta)('isLoading')
}

export const selectItemIsLoaded = state => payload => {
  const item = selectItem(state)(payload)
  const meta = selectMeta(item)
  return selectValueByKey(meta)('IsLoaded')
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

// ---
export const selectItemById = (state) => (type, id) => {
  const items = selectItems(state)({ type })
  if (!Array.isArray(items)) { return undefined }
  return items.find(item => item.type === type && item.id === id)
}

export const selectRawItemAttributes = (state) => (type, id) => {
  const item = selectItemById(state)(type, id)
  return selectRawAttributes(item)
}

export const selectRawAttributes = (item) => selectValueByKey(item)('attributes')

export const selectItemChangedAttributes = (state) => (type, id) => {
  const item = selectItemById(state)(type, id)
  return selectChangedAttributes(item)
}

export const selectChangedAttributes = (item) => {
  const meta = selectMeta(item)
  return selectValueByKey(meta)('changedAttributes')
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
  return selectValueByKey(attributes)(name)
}

export const selectItemRawAttributeByName = (state) => (type, id, name) => {
  const item = selectItemById(state)(type, id)
  return selectRawAttributeByName(item)(name)
}

export const selectRawAttributeByName = (item) => (name) => {
  const attributes = selectRawAttributes(item)
  return selectValueByKey(attributes)(name)
}

export const selectItemChangedAttributeByName = (state) => (type, id, name) => {
  const item = selectItemById(state)(type, id)
  return selectChangedAttributeByName(item)(name)
}

export const selectChangedAttributeByName = (item) => (name) => {
  const attributes = selectChangedAttributes(item)
  return selectValueByKey(attributes)(name)
}

export const selectItemRelationships = (state) => (type, id) => {
  const item = selectItemById(state)(type, id)
  return selectRelationships(item)
}

export const selectRelationships = (item) => {
  return selectValueByKey(item)('relationships')
}

export const selectItemRelationshipByName = (state) => (type, id, name) => {
  const relationships = selectItemRelationships(state)(type, id)
  return selectRelationshipByName(relationships)(name)
}

export const selectRelationshipByName = (relationships) => (name) => selectValueByKey(relationships)(name)

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
  const changedData = selectValueByKey(meta)('changedData')
  return changedData || data
}

export const selectRelationshipRawData = (relationship) => selectData(relationship)

export const selectRelationshipChangedData = (relationship) => {
  const meta = selectMeta(relationship)
  return selectValueByKey(meta)('changedData')
}
