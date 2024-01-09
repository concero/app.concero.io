import { type FC } from 'react'

interface RowsComponentProps {
	item: any
	isSelected: boolean
	onSelect: (item: any) => void
}

export interface MultiSelectModalProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	title: string
	selectedItems: any[]
	onSelect: (item: any) => void
	getItems: (key: any) => Promise<any>
	RenderItem: FC<RowsComponentProps>
	isSearchable?: boolean
	isHandleEndReached?: boolean
}
