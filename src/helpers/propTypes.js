import { PropTypes } from 'react'

export const item = PropTypes.shape({
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  relationships: PropTypes.object,
  meta: PropTypes.object
})

export const identifier = PropTypes.shape({
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
})
