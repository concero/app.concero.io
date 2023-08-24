import { Chart } from '../ChartCard/Chart'
import classNames from './StakingChartCard.module.pcss'
import { data } from './data'
import { secondData } from './secondData'
import { Button } from '../../buttons/Button/Button'

interface StakingChartCardProps {}

export const StakingChartCard = () => {
  return (
    <div className={`card ${classNames.container}`}>
      <div className={classNames.headerContainer}>
        <h5 className={'cardHeaderTitle'}>Chart</h5>
        <div className={classNames.tagsContainer}>
          <Button size={'sm'} variant={'primary'} onClick={() => console.log('test')}>
            TVL & APY
          </Button>
          <Button size={'sm'} variant={'subtle'} onClick={() => console.log('test')}>
            Supply APY
          </Button>
          <Button size={'sm'} variant={'subtle'} onClick={() => console.log('test')}>
            7d moving avg of Supply
          </Button>
        </div>
      </div>
      <Chart data={data} secondData={secondData} />
    </div>
  )
}
