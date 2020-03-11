import React from 'react'
import { useTranslation } from 'react-i18next'
import { useWeapon, useWeaponActions } from '~/app/hooks/weapon'
import Select from '../common/Select'

require('./WeaponSlots.css')

interface Props {
}

const WeaponSlots: React.FC<Props> = () => {
  const { t } = useTranslation()
  const { slots, skill } = useWeapon()
  const { setSlots } = useWeaponActions()
  const value = [...slots, skill === 'yws_none' ? 0 : 1].join('-')

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSlots(e.currentTarget.value.split('-').map(Number) as [number, number, number, 0 | 1])

  return (
    <div className="WeaponSlots">
      <div>{t('武器スロット')}</div>
      <Select value={value} onChange={onChange}>
        <optgroup label={t('武器スロットなし')}>
          <option value="0-0-0-0">{t('なし')}</option>
        </optgroup>
        <optgroup label={t('最大Lv{{level}}', { level: 1 })}>
          <option value="1-0-0-0">【1】</option>
          <option value="1-1-0-0">【1】【1】</option>
          <option value="1-1-1-0">【1】【1】【1】</option>
        </optgroup>
        <optgroup label={t('最大Lv{{level}}', { level: 2 })}>
          <option value="2-0-0-0">【2】</option>
          <option value="2-1-0-0">【2】【1】</option>
          <option value="2-1-1-0">【2】【1】【1】</option>
          <option value="2-2-0-0">【2】【2】</option>
          <option value="2-2-1-0">【2】【2】【1】</option>
          <option value="2-2-2-0">【2】【2】【2】</option>
        </optgroup>
        <optgroup label={t('最大Lv{{level}}', { level: 3 })}>
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
        <optgroup label={t('最大Lv{{level}}', { level: 4 })}>
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
        <optgroup label={t('スキル付き覚醒武器')}>
          <option value="4-0-0-1">{t('[覚醒]')}【4】</option>
          <option value="4-1-0-1">{t('[覚醒]')}【4】【1】</option>
          <option value="4-1-1-1">{t('[覚醒]')}【4】【1】【1】</option>
          <option value="4-2-0-1">{t('[覚醒]')}【4】【2】</option>
          <option value="4-2-1-1">{t('[覚醒]')}【4】【2】【1】</option>
          <option value="4-2-2-1">{t('[覚醒]')}【4】【2】【2】</option>
          <option value="4-3-0-1">{t('[覚醒]')}【4】【3】</option>
          <option value="4-3-1-1">{t('[覚醒]')}【4】【3】【1】</option>
          <option value="4-3-2-1">{t('[覚醒]')}【4】【3】【2】</option>
          <option value="4-3-3-1">{t('[覚醒]')}【4】【3】【3】</option>
          <option value="4-4-0-1">{t('[覚醒]')}【4】【4】</option>
          <option value="4-4-1-1">{t('[覚醒]')}【4】【4】【1】</option>
          <option value="4-4-2-1">{t('[覚醒]')}【4】【4】【2】</option>
          <option value="4-4-3-1">{t('[覚醒]')}【4】【4】【3】</option>
          <option value="4-4-4-1">{t('[覚醒]')}【4】【4】【4】</option>
        </optgroup>
      </Select>
    </div>
  )
}

export default WeaponSlots
