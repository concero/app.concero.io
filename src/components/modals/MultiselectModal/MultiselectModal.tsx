import { FC } from 'react'
import { Modal } from '../Modal/Modal'
import { Button } from '../../buttons/Button/Button'
import classNames from './MultiselectModal.module.pcss'
import { MultiSelectModalProps } from './types'
import { TextInput } from '../../input/TextInput'

export const MultiselectModal: FC<MultiSelectModalProps> = ({
  isOpen,
  setIsOpen,
  items,
  title,
  RowComponent,
  selectedItems,
  onSelect,
}) => {
  return (
    <Modal show={isOpen} setShow={setIsOpen} title={title}>
      <div className={classNames.container}>
        <div className={classNames.inputContainer}>
          <TextInput iconName="Search" placeholder="Search..." />
        </div>
        <div className={classNames.itemsContainer}>
          {items.map((item) => {
            const isSelected = selectedItems.includes(item)
            return (
              <Button key={item.id} variant={isSelected ? 'filled' : 'black'} onClick={() => onSelect(item)}>
                <RowComponent item={item} isSelected={isSelected} />
              </Button>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
