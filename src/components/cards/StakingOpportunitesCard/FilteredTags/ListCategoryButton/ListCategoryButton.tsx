import classNames from './ListCategoryButton.module.pcss'
import { Button } from '../../../../buttons/Button/Button'
import { IconCheck } from '@tabler/icons-react'

interface ListCategoryButtonProps {
  item: any
  isSelected: boolean
  onSelect: (item: any) => void
}

export function ListCategoryButton({ item, isSelected, onSelect }: ListCategoryButtonProps) {
  return (
    <Button variant={isSelected ? 'primary' : 'black'} onClick={() => onSelect(item)}>
      <div className={classNames.container}>
        <h4>{item}</h4>
        <IconCheck size={16} color={isSelected ? 'white' : 'transparent'} />
      </div>
    </Button>
  )
}
