import { FC, memo, useCallback, useEffect, useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import { Chart } from '../../layout/Chart/Chart'
import classNames from './EarnChartCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { EarnChartCardProps } from './types'
import { useChartReducer } from './chartReducer/chartReducer'
import { getData } from './getData'
import { switchChartType } from './switchChartType'
import { buttonsData } from './constants'
import { ListModal } from '../../modals/ListModal/ListModal'
import { RowComponent } from './RowComponent/RowConponent'
import { CardHeader } from '../CardHeader/CardHeader'

const MemoizedChart = memo(Chart)

export const EarnChartCard: FC<EarnChartCardProps> = ({ selectedVault }) => {
	const [chartState, dispatch] = useChartReducer()
	const { data, chartType, response, isTypeModalVisible } = chartState
	const [selectedItems, setSelectedItems] = useState([buttonsData[chartType]])

	const setData = useCallback(
		data => {
			dispatch({ type: 'SET_DATA', payload: data })
		},
		[dispatch],
	)

	const setChartType = useCallback(
		type => {
			dispatch({ type: 'SET_CHART_TYPE', payload: type })
		},
		[dispatch],
	)

	const setIsTypeModalVisible = useCallback(
		isVisible => {
			dispatch({ type: 'SET_IS_TYPE_MODAL_VISIBLE', payload: isVisible })
		},
		[dispatch],
	)

	const handleTypeButtonClick = useCallback(() => {
		setIsTypeModalVisible(true)
	}, [setIsTypeModalVisible])

	const getItems = useCallback(() => buttonsData, [])

	const handleSelectType = useCallback(
		item => {
			setIsTypeModalVisible(false)
			setChartType(item.type)
			setSelectedItems([item])
		},
		[setIsTypeModalVisible, setChartType],
	)

	useEffect(() => {
		getData({ selectedVault, dispatch })
	}, [selectedVault.address])

	useEffect(() => {
		switchChartType({ chartType, response, setData })
	}, [response, chartType])

	return (
		<div className={`card ${classNames.container}`}>
			<div className={classNames.headerContainer}>
				<CardHeader tiztle="Chart" isLoading={chartState.isLoading} />
				<div className={classNames.tagsContainer}>
					<Button variant="subtle" size="sm" rightIcon={<IconChevronDown size={16} />} onClick={handleTypeButtonClick}>
						{buttonsData[chartType].title}
					</Button>
				</div>
			</div>
			<div className={classNames.chartContainer}>
				<MemoizedChart data={data.main} secondData={data.secondary} />
			</div>
			<ListModal
				isOpen={isTypeModalVisible}
				setIsOpen={setIsTypeModalVisible}
				getItems={getItems}
				RenderItem={RowComponent}
				selectedItems={selectedItems}
				onSelect={handleSelectType}
				isSearchable={false}
				title="Select chart type"
			/>
		</div>
	)
}
