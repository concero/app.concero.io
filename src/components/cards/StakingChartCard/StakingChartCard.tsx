import { FC, useEffect, useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import { Chart } from '../../layout/Chart/Chart'
import classNames from './StakingChartCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { StakingChartCardProps } from './types'
import { useChartReducer } from './chartReducer/chartReducer'
import { getData } from './getData'
import { switchChartType } from './switchChartType'
import { buttonsData } from './constants'
import { ListModal } from '../../modals/MultiselectModal/ListModal'
import { RowComponent } from './RowComponent/RowConponent'
import { CardHeader } from '../CardHeader/CardHeader'

export const StakingChartCard: FC<StakingChartCardProps> = ({ selectedVault }) => {
  const [chartState, dispatch] = useChartReducer()
  const { data, chartType, response, isTypeModalVisible } = chartState
  const [selectedItems, setSelectedItems] = useState([buttonsData[chartType]])

  const setData = (data) => {
    dispatch({ type: 'SET_DATA', payload: data })
  }

  const setChartType = (type) => {
    dispatch({ type: 'SET_CHART_TYPE', payload: type })
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
    getData({ selectedVault, dispatch })
  }, [selectedVault.address])

  useEffect(() => {
    switchChartType({ chartType, response, setData })
  }, [response, chartType])

  return (
    <div className={`card ${classNames.container}`}>
      <div className={classNames.headerContainer}>
        <CardHeader title={'Chart'} isLoading={chartState.isLoading} />
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
