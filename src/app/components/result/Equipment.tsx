import Accordion from '../common/Accordion'
import EquipmentTable from './EquipmentTable'
import SkillTable from './SkillTable'
import { Equipment as IEquipment } from '~/app/util/calc'

require('./Equipment.css')

interface Props {
  title: string
  result: IEquipment
  initState?: boolean
}

const Equipment: React.FC<Props> = ({ title, result, initState }) =>
  <Accordion className="Equipment" title={title} initState={initState}>
    <div className="Equipment-content">
      <div className="Equipment-column">
        <EquipmentTable equipment={result} />
      </div>
      <div className="Equipment-column">
        <SkillTable skillList={result.skills} />
      </div>
    </div>
  </Accordion>

export default Equipment
