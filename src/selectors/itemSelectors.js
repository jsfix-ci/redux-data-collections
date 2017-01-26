// TODO: move to a more generic location
export const selectData = (item) => selectValueByKey(item)('data')
export const selectMeta = (item) => selectValueByKey(item)('meta')
export const selectId = (item) => selectValueByKey(item)('id')
export const selectType = (item) => selectValueByKey(item)('type')
export const selectValueByKey = (item) => (key) => item !== undefined ? item[key] : undefined

// state is a list with data and meta
export const selectItemById = (state) => (type, id) => {
  const data = selectData(state)
  return Array.isArray(data) ? data.find(item => item.type === type && item.id === id) : undefined
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
