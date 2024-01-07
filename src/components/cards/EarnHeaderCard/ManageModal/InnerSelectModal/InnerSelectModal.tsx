import { type FC, useEffect, useRef, useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { TextInput } from '../../../../input/TextInput'
import classNames from './InnerSelectModal.module.pcss'

interface InnerSelectModalProps {
	getItems: (params: { offset: number; limit: number; search: string }) => Promise<any[]>
	RenderItem: FC<any>
	selectedItems?: any[]
	onSelect: (item: any) => void
	chainId?: number
}

export const InnerSelectModal: FC<InnerSelectModalProps> = ({ getItems, RenderItem, selectedItems = [], onSelect, chainId = null }) => {
	const limit = 15
	const [offset, setOffset] = useState<number>(0)
	const [items, setItems] = useState<any[]>([])
	const [search, setSearch] = useState<string>('')
	const itemsContainerRef = useRef(null)

	useEffect(() => {
		setOffset(0)
		;(async () => {
			const initialItems = await getItems({ offset: 0, limit, search, ...(chainId && { chainId }) })
			setItems(initialItems)
		})()
	}, [])

	const handleSearch = async value => {
		setSearch(value)
		const foundItems = await getItems({ offset: 0, limit, search: value, ...(chainId && { chainId }) })
		setItems(foundItems)
	}
	const handleEndReached = async () => {
		const newOffset = offset + limit
		setOffset(newOffset)
		try {
			const newItems = await getItems({ offset: newOffset, limit, search, ...(chainId && { chainId }) })
			setItems(prevItems => [...prevItems, ...newItems])
		} catch (error) {}
	}

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
		if (scrollHeight - scrollTop === clientHeight) handleEndReached()
	}

	return (
		<div className={classNames.container}>
			<div className={classNames.inputContainer}>
				<TextInput icon={<IconSearch color="var(--color-text-secondary)" size={18} />} placeholder="Search..." value={search} onChangeText={handleSearch} />
			</div>
			<div className={classNames.itemsContainer} ref={itemsContainerRef} onScroll={handleScroll}>
				{items.map(item => {
					const isSelected = selectedItems.includes(item)
					return <RenderItem key={item._id} item={item} isSelected={isSelected} onSelect={onSelect} />
				})}
			</div>
		</div>
	)
}
