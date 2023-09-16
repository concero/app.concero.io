import { FC, useEffect, useState } from 'react'
import { Chart } from '../../layout/Chart/Chart'
import classNames from './StakingChartCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { StakingChartCardProps } from './types'
import { useChartReducer } from './chartReducer/chartReducer'
import { fetchData } from './fetchData'
import { switchChartType } from './switchChartType'
import { buttonsData } from './constants'
import { IconChevronDown } from '@tabler/icons-react'
import { ListModal } from '../../modals/MultiselectModal/ListModal'
import { RowComponent } from './RowComponent/RowConponent'

export const StakingChartCard: FC<StakingChartCardProps> = ({ stakingState }) => {
  const { selectedVault } = stakingState
  const [chartState, dispatch] = useChartReducer()
  const { data, chartType, response, isTypeModalVisible } = chartState
  const [selectedItems, setSelectedItems] = useState([buttonsData[chartType]])

  const setData = (data) => {
    dispatch({ type: 'SET_DATA', payload: data })
  }

  const setChartType = (type) => {
    dispatch({ type: 'SET_CHART_TYPE', payload: type })
  }

  const setResponse = (r) => {
    dispatch({ type: 'SET_RESPONSE', payload: r })
  }

  function setIsTypeModalVisible(isVisible: boolean) {
    dispatch({ type: 'SET_IS_TYPE_MODAL_VISIBLE', payload: isVisible })
  }

  function handleTypeButtonClick() {
    setIsTypeModalVisible(true)
  }

  const getItems = () => buttonsData

  function handleSelectType(item) {
    setIsTypeModalVisible(false)
    setChartType(item.type)
    setSelectedItems([item])
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
          <Button variant={'subtle'} size={'sm'} rightIcon={<IconChevronDown size={16} />} onClick={handleTypeButtonClick}>
            {buttonsData[chartType].title}
          </Button>
        </div>
      </div>
      <div className={classNames.chartContainer}>
        <Chart data={data.main} secondData={data.secondary} />
      </div>
      <ListModal
        isOpen={isTypeModalVisible}
        setIsOpen={setIsTypeModalVisible}
        getItems={getItems}
        RenderItem={RowComponent}
        selectedItems={selectedItems}
        onSelect={handleSelectType}
        isSearchable={false}
        title={'Select chart type'}
      />
    </div>
  )
}
