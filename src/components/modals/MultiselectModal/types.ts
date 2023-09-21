import { FC } from 'react'

interface RowsComponentProps {
  item: any
  isSelected: boolean
}

export interface MultiSelectModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  items: any[]
  title: string
  selectedItems: any[]
  onSelect: (item: any) => void
  type: 'multiselect' | 'singleselect'
  getItems: (key: any) => void
  RenderItem: FC<RowsComponentProps>
  isSearchable?: boolean
}
