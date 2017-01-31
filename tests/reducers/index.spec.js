import defaultReducer from 'reducers'

describe('Reducers', () => {
  describe('defaultReducer', () => {
    it('returns reducer function for defaultReducer(\'name\')', () => {
      const reducer = defaultReducer('name')
      expect(typeof reducer).toBe('function')
    })
  })
})
