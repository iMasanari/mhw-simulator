import { useMemo } from 'react'

const createId = () =>
  'datalistId-' + Math.random().toString(36).slice(-6)

export default () => {
  const id = useMemo(createId, [])

  return id
}
