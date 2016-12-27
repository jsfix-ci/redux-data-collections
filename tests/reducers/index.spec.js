import defaultReducer from 'reducers'

describe('Reducers', () => {
  describe('defaultReducer', () => {
    it('returns reducer function for defaultReducer()', () => {
      const reducer = defaultReducer()
      expect(typeof reducer).toBe('function')
    })
  })
})
