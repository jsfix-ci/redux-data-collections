export const makeSelectors = (state, createSelector, selectors) => Object.keys(selectors).reduce((s, key) => ({
  ...s,
  [key]: createSelector(state, selectors[key])
}), {})

export default makeSelectors
