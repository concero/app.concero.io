import { FC, useEffect } from 'react'
import { Chart } from '../../layout/Chart/Chart'
import classNames from './StakingChartCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { StakingChartCardProps } from './types'
import { getSelectedStyle } from './handlers'
import { buttonsData } from './constants'
import { useChartReducer } from './chartReducer/chartReducer'
import { fetchData } from './fetchData'
import { switchChartType } from './switchChartType'

export const StakingChartCard: FC<StakingChartCardProps> = ({ stakingState }) => {
  const { selectedVault } = stakingState
  const [{ data, chartType, response }, dispatch] = useChartReducer()

  const setData = (data) => {
    dispatch({ type: 'SET_DATA', payload: data })
  }

  const setChartType = (type) => {
    dispatch({ type: 'SET_CHART_TYPE', payload: type })
  }

  const setResponse = (r) => {
    dispatch({ type: 'SET_RESPONSE', payload: r })
  }

  useEffect(() => {
    fetchData({ selectedVault, setResponse })
  }, [selectedVault])

  useEffect(() => {
    switchChartType({ chartType, response, setData })
  }, [response, chartType])

  return (
    <div className={`card ${classNames.container}`}>
      <div className={classNames.headerContainer}>
        <h5 className={'cardHeaderTitle'}>Chart</h5>
        <div className={classNames.tagsContainer}>
          {buttonsData.map((button) => (
            <Button key={button.title} size={'sm'} variant={getSelectedStyle(chartType === button.type)} onClick={() => setChartType(button.type)}>
              {button.title}
            </Button>
          ))}
        </div>
      </div>
      <div className={classNames.chartContainer}>
        <Chart data={data.main} secondData={data.secondary} />
      </div>
    </div>
  )
}
