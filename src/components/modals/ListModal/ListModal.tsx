import { type FC, useEffect, useRef, useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { Modal } from '../Modal/Modal'
import classNames from './ListModal.module.pcss'
import { type MultiSelectModalProps } from './types'
import { TextInput } from '../../input/TextInput'

export const ListModal: FC<MultiSelectModalProps> = ({
	getItems,
	isOpen,
	setIsOpen,
	title,
	RenderItem,
	selectedItems = [],
	onSelect,
	isSearchable = true,
	isHandleEndReached = true,
}) => {
	const limit = 15
	const [offset, setOffset] = useState<number>(0)
	const [items, setItems] = useState<any[]>([])
	const [search, setSearch] = useState<string>('')
	const itemsContainerRef = useRef(null)

	useEffect(() => {
		if (!isOpen) return
		setOffset(0)
		;(async () => {
			const initialItems = await getItems({ offset: 0, limit, search })
			setItems(initialItems)
		})()
	}, [isOpen])

	const handleEndReached = async () => {
		if (!isHandleEndReached) return
		const newOffset = offset + limit
		setOffset(newOffset)
		try {
			const newItems = await getItems({ offset: newOffset, limit, search })
			setItems(prevItems => [...prevItems, ...newItems])
		} catch (error) {
			// Handle error appropriately
		}
	}

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
		if (scrollHeight - scrollTop === clientHeight) handleEndReached()
	}

	const handleSearch = async value => {
		setSearch(value)
		const foundItems = await getItems({ offset: 0, limit, search: value })
		setItems(foundItems)
	}

	return (
		<Modal show={isOpen} setShow={setIsOpen} title={title}>
			<div className={classNames.container}>
				<div className={classNames.inputContainer}>
					{isSearchable ? <TextInput icon={<IconSearch color="var(--color-text-secondary)" size={18} />} placeholder="Search..." value={search} onChangeText={handleSearch} /> : null}
				</div>
				<div className={classNames.itemsContainer} ref={itemsContainerRef} onScroll={handleScroll}>
					{items.map((item, index) => {
						const isSelected = selectedItems.includes(item)
						return <RenderItem key={item._id ?? index} item={item} isSelected={isSelected} onSelect={onSelect} />
					})}
				</div>
			</div>
		</Modal>
	)
}
