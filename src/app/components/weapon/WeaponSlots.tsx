import React from 'react'
import { useWeaponSlots, useWeaponSlotsActions } from '~/app/hooks/weaponSlots'
import { WeaponSlots } from '~/app/modules/weaponSlots'
import Select from '../common/Select'

require('./WeaponSlots.css')

interface Props {
}

const WeaponSlots: React.FC<Props> = () => {
  const slots = useWeaponSlots()
  const { set } = useWeaponSlotsActions()

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    set(e.currentTarget.value.split('-').map(Number) as WeaponSlots)

  return (
    <div className="WeaponSlots">
      <div>武器スロット</div>
      <Select value={slots.join('-')} onChange={onChange}      >
        <optgroup label="武器スロットなし">
          <option value="0-0-0-0">なし</option>
        </optgroup>
        <optgroup label="最大Lv1">
          <option value="1-0-0-0">【1】</option>
          <option value="1-1-0-0">【1】【1】</option>
          <option value="1-1-1-0">【1】【1】【1】</option>
        </optgroup>
        <optgroup label="最大Lv2">
          <option value="2-0-0-0">【2】</option>
          <option value="2-1-0-0">【2】【1】</option>
          <option value="2-1-1-0">【2】【1】【1】</option>
          <option value="2-2-0-0">【2】【2】</option>
          <option value="2-2-1-0">【2】【2】【1】</option>
          <option value="2-2-2-0">【2】【2】【2】</option>
        </optgroup>
        <optgroup label="最大Lv3">
          <option value="3-0-0-0">【3】</option>
          <option value="3-1-0-0">【3】【1】</option>
          <option value="3-1-1-0">【3】【1】【1】</option>
          <option value="3-2-0-0">【3】【2】</option>
          <option value="3-2-1-0">【3】【2】【1】</option>
          <option value="3-2-2-0">【3】【2】【2】</option>
          <option value="3-3-0-0">【3】【3】</option>
          <option value="3-3-1-0">【3】【3】【1】</option>
          <option value="3-3-2-0">【3】【3】【2】</option>
          <option value="3-3-3-0">【3】【3】【3】</option>
        </optgroup>
        <optgroup label="最大Lv4">
          <option value="4-0-0-0">【4】</option>
          <option value="4-1-0-0">【4】【1】</option>
          <option value="4-1-1-0">【4】【1】【1】</option>
          <option value="4-2-0-0">【4】【2】</option>
          <option value="4-2-1-0">【4】【2】【1】</option>
          <option value="4-2-2-0">【4】【2】【2】</option>
          <option value="4-3-0-0">【4】【3】</option>
          <option value="4-3-1-0">【4】【3】【1】</option>
          <option value="4-3-2-0">【4】【3】【2】</option>
          <option value="4-3-3-0">【4】【3】【3】</option>
          <option value="4-4-0-0">【4】【4】</option>
          <option value="4-4-1-0">【4】【4】【1】</option>
          <option value="4-4-2-0">【4】【4】【2】</option>
          <option value="4-4-3-0">【4】【4】【3】</option>
          <option value="4-4-4-0">【4】【4】【4】</option>
        </optgroup>
        <optgroup label="スキル付き覚醒武器">
          <option value="4-0-0-1">[覚醒]【4】</option>
          <option value="4-1-0-1">[覚醒]【4】【1】</option>
          <option value="4-1-1-1">[覚醒]【4】【1】【1】</option>
          <option value="4-2-0-1">[覚醒]【4】【2】</option>
          <option value="4-2-1-1">[覚醒]【4】【2】【1】</option>
          <option value="4-2-2-1">[覚醒]【4】【2】【2】</option>
          <option value="4-3-0-1">[覚醒]【4】【3】</option>
          <option value="4-3-1-1">[覚醒]【4】【3】【1】</option>
          <option value="4-3-2-1">[覚醒]【4】【3】【2】</option>
          <option value="4-3-3-1">[覚醒]【4】【3】【3】</option>
          <option value="4-4-0-1">[覚醒]【4】【4】</option>
          <option value="4-4-1-1">[覚醒]【4】【4】【1】</option>
          <option value="4-4-2-1">[覚醒]【4】【4】【2】</option>
          <option value="4-4-3-1">[覚醒]【4】【4】【3】</option>
          <option value="4-4-4-1">[覚醒]【4】【4】【4】</option>
        </optgroup>
      </Select>
    </div>
  )
}

export default WeaponSlots
