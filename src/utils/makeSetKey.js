import { stringify } from 'query-string'

export const makeSetKey = (key, options) => {
  if (!options) { return key }
  const optionsCopy = { ...options }
  // TODO: decide which options to stringify?
  delete optionsCopy.page // the page shouldn't be in the key
  return `${key}?${stringify(optionsCopy)}`
}
