import { useCallback, useState } from 'react'

export type WeaponSlots = [number, number, number]

const initState: WeaponSlots = [0, 0, 0]

export default () => {
  const [slots, setSlots] = useState(initState)

  const updateSlot = useCallback((id: number, value: number) => {
    setSlots(slots =>
      slots.map((v, i) => i === id ? value : v) as WeaponSlots
    )
  }, [])

  const clearSlots = useCallback(() => {
    setSlots(initState)
  }, [])

  return [slots, updateSlot, clearSlots] as const
}
