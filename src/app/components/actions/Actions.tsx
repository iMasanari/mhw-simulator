import React, { useCallback, useEffect } from 'react'
import { useActiveSkill, useActiveSkillActions } from '../../hooks/activeSkill'
import { useAddableSkillActions } from '../../hooks/addableSkill'
import { useDecos } from '../../hooks/decos'
import { useIgnoreArmors } from '../../hooks/ignoreArmors'
import { useResultActions } from '../../hooks/result'
import { useSkillLogActions } from '../../hooks/skillLog'
import { useTabActions } from '../../hooks/tab'
import { useWeaponSlots } from '../../hooks/weaponSlots'
import { terminate } from '../../util/calc'
import ActionButton from './ActionButton'

interface Props {
  skillList: string[]
  resetSkillScroll: () => void
  scrollOutputArea: () => void
}

const Actions: React.FC<Props> = ({ skillList, resetSkillScroll, scrollOutputArea }) => {
  const activeSkill = useActiveSkill()
  const { clear: clearActiveSkill } = useActiveSkillActions()
  const { search: searchAddableSkill, clear: clearAddableSkill } = useAddableSkillActions()
  const { update: updateSkillLog } = useSkillLogActions()
  const weaponSlots = useWeaponSlots()
  const ignoreArmors = useIgnoreArmors()
  const decos = useDecos()
  const { set: setTab } = useTabActions()
  const { searchSummary, searchList } = useResultActions()

  const onSearchSummary = useCallback(() => {
    clearAddableSkill()
    updateSkillLog(activeSkill)

    searchSummary(activeSkill, weaponSlots, ignoreArmors, decos)
    setTab('result')

    resetSkillScroll()
    scrollOutputArea()
  }, [activeSkill, weaponSlots, ignoreArmors, decos, searchSummary])

  const onSearchList = useCallback(() => {
    clearAddableSkill()
    updateSkillLog(activeSkill)

    searchList(activeSkill, weaponSlots, ignoreArmors, decos)
    setTab('result')

    resetSkillScroll()
    scrollOutputArea()
  }, [activeSkill, weaponSlots, ignoreArmors, decos, searchList])

  const onSearchAddableSkill = useCallback(() => {
    searchAddableSkill(activeSkill, weaponSlots, ignoreArmors, decos, skillList)

    resetSkillScroll()
  }, [activeSkill, weaponSlots, ignoreArmors, decos, skillList])

  const onClear = useCallback(() => {
    clearActiveSkill()
    clearAddableSkill()
    terminate()
  }, [])

  // 初回検索
  useEffect(() => {
    searchSummary(activeSkill, weaponSlots, ignoreArmors, decos)
  }, [])

  return (
    <>
      <ActionButton label="検索" onClick={onSearchSummary} primary />
      <ActionButton label="クリア" onClick={onClear} />
      <ActionButton label="10件検索β" onClick={onSearchList} />
      <ActionButton label="追加スキルβ" onClick={onSearchAddableSkill} />
    </>
  )
}

export default Actions
