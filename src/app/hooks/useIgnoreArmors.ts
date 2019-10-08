import { useCallback, useEffect, useState } from 'react'

export type Armors = Record<string, 0 | 1>

const STORAGE_KEY = 'mhw-simulator/ignoreArmors/v1.1'
const initState: Armors = JSON.parse(localStorage.getItem(STORAGE_KEY)!) || {}

export default () => {
  const [ignoreArmors, setIgnoreArmors] = useState(initState)

  const toggleIgnoreArmors = useCallback((armor: string) => {
    setIgnoreArmors(v => {
      if (v[armor] == 0) {
        const { [armor]: _removed, ...rest } = v
        return rest
      }

      return { ...v, [armor]: 0 }
    })
  }, [])

  // ignoreArmors変更時
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ignoreArmors))
  }, [ignoreArmors])

  return [ignoreArmors, toggleIgnoreArmors] as const
}
