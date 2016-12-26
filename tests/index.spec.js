import reduxDataReducer from '../src'

describe('reduxDataReducer', () => {
  it('returns reducer function for reduxDataReducer()', () => {
    const reducer = reduxDataReducer()
    expect(typeof reducer).toBe('function')
  })
  it('returns empty state for reduxDataReducer()()', () => {
    const expectedState = { data: [], meta: {} }
    const state = reduxDataReducer()()
    expect(state).toEqual(expectedState)
  })
})
