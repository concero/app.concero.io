// todo: remove when api connected
import { type FC, useEffect, useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { TextInput } from '../../input/TextInput'
import { Table } from '../../layout/Table/Table'
import { Modal } from '../Modal/Modal'
import classNames from './EntityListModal.module.pcss'

export interface EntityListModalProps {
	title: string
	data: any[]
	columns: any[]
	show: boolean
	setShow: (show: boolean) => void
	onSelect: (item: any) => void
	onEndReached?: () => void
	animate?: boolean
	entitiesVisible?: number
}

export const EntityListModal: FC<EntityListModalProps> = ({ title, data, columns, show, setShow, onSelect, onEndReached = null, animate = true, entitiesVisible = 20 }) => {
	const [filteredData, setFilteredData] = useState<any[]>([])
	const [value, setValue] = useState<string>('')

	useEffect(() => {
		const newData = value ? data.filter(chain => chain.symbol.toLowerCase().includes(value.toLowerCase())) : data

		setFilteredData(newData.slice(0, entitiesVisible))
	}, [data, entitiesVisible, value])

	const handleSelect = item => {
		onSelect(item)
		setShow(false)
	}

	const handleEndReached = () => {
		if (onEndReached) {
			onEndReached()
		} else {
			const startIndex = filteredData.length
			const endIndex = startIndex + entitiesVisible
			setFilteredData(prevData => [...prevData, ...data.slice(startIndex, endIndex)])
		}
	}

	return (
		<Modal title={title} show={show} setShow={setShow}>
			<div className={classNames.container}>
				<TextInput
					icon={<IconSearch color="var(--color-text-secondary)" size={18} />}
					value={value}
					placeholder="Search..."
					onChangeText={val => {
						setValue(val)
					}}
				/>
				<Table
					columns={columns}
					items={filteredData}
					onClick={item => {
						handleSelect(item)
					}}
					onEndReached={handleEndReached}
					animate={animate}
				/>
			</div>
		</Modal>
	)
}
