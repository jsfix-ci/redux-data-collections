import defaultReducer from 'reducers'

describe('reducers/index.js', () => {
  it('returns reducer function for defaultReducer()', () => {
    const reducer = defaultReducer()
    expect(typeof reducer).toBe('function')
  })
})
