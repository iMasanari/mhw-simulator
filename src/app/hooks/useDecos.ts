import { useCallback, useEffect, useState } from 'react'

export type Decos = Record<string, number>

const STORAGE_KEY = 'mhw-simulator/decos/v1'
const initState: Decos = JSON.parse(localStorage.getItem(STORAGE_KEY)!) || {}

export default () => {
  const [decos, setDecos] = useState(initState)

  const setDeco = useCallback((deco: string, count: number | null) => {
    setDecos(v => {
      if (count == null) {
        const { [deco]: _removed, ...rest } = v
        return rest
      }

      return { ...v, [deco]: count }
    })
  }, [])

  // decos変更時
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decos))
  }, [decos])

  return [decos, setDeco] as const
}
