import { FC, useEffect, useState } from 'react'
import { Chart } from '../../layout/Chart/Chart'
import classNames from './StakingChartCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { getChartData } from './getChartData'
import { StakingChartCardProps } from './types'
import { getSelectedStyle } from './handlers'

enum ChartType {
  TVLAPY,
  SUPPLYAPY,
  SUPPLY7D,
}

export const StakingChartCard: FC<StakingChartCardProps> = ({ selectedVault }) => {
  const [data, setData] = useState({
    apy: [],
    tvlUsd: [],
  })
  const [chartType, setChartType] = useState(ChartType.TVLAPY)

  useEffect(() => {
    getChartData({
      selectedVault,
      setData,
    })
  }, [selectedVault])

  return (
    <div className={`card ${classNames.container}`}>
      <div className={classNames.headerContainer}>
        <h5 className={'cardHeaderTitle'}>Chart</h5>
        <div className={classNames.tagsContainer}>
          <Button
            size={'sm'}
            variant={getSelectedStyle(chartType === ChartType.TVLAPY)}
            onClick={() => setChartType(ChartType.TVLAPY)}
          >
            TVL & APY
          </Button>
          <Button
            size={'sm'}
            variant={getSelectedStyle(chartType === ChartType.SUPPLYAPY)}
            onClick={() => setChartType(ChartType.SUPPLYAPY)}
          >
            Supply APY
          </Button>
          <Button
            size={'sm'}
            variant={getSelectedStyle(chartType === ChartType.SUPPLY7D)}
            onClick={() => setChartType(ChartType.SUPPLY7D)}
          >
            7d moving avg of Supply
          </Button>
        </div>
      </div>
      <Chart data={data.apy} secondData={data.tvlUsd} />
    </div>
  )
}
