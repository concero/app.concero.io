import { Chart } from '../ChartCard/Chart'
import classNames from './StakingChartCard.module.pcss'
import { data } from './data'
import { secondData } from './secondData'
import { Tag } from '../../tags/Tag/Tag'

interface StakingChartCardProps {}

export const StakingChartCard = () => {
  return (
    <div className={`card ${classNames.container}`}>
      <div className={classNames.headerContainer}>
        <h5 className={'cardHeaderTitle'}>Chart</h5>
        <div className={classNames.tagsContainer}>
          <Tag color={'main'} title={'TVL & APY'} onClick={() => console.log('test')} />
          <Tag color={'secondary'} title={'Supply APY'} onClick={() => console.log('test')} />
          <Tag color={'secondary'} title={'7d moving avg of Supply'} onClick={() => console.log('test')} />
        </div>
      </div>
      <Chart data={data} secondData={secondData} />
    </div>
  )
}
