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
  RowComponent: FC<RowsComponentProps>
  selectedItemsIds: string[]
  setSelectedItemsIds: (key: any) => void
  type: 'multiselect' | 'singleselect'
}
