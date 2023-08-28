import { FC } from 'react'
import { Modal } from '../Modal/Modal'
import { Button } from '../../buttons/Button/Button'
import classNames from './MultiselectModal.module.pcss'
import { MultiSelectModalProps } from './types'
import { TextInput } from '../../input/TextInput'
import { handleSelect } from './handlers'

export const MultiselectModal: FC<MultiSelectModalProps> = ({
  isOpen,
  setIsOpen,
  type,
  items,
  title,
  RowComponent,
  selectedItemsIds,
  setSelectedItemsIds,
}) => {
  return (
    <Modal show={isOpen} setShow={setIsOpen} title={title}>
      <div className={classNames.container}>
        <div className={classNames.inputContainer}>
          <TextInput iconName="Search" placeholder="Search..." />
        </div>
        <div className={classNames.itemsContainer}>
          {items.map((item) => {
            const isSelected = selectedItemsIds.includes(item.id)
            return (
              <Button
                key={item.id}
                variant={isSelected ? 'filled' : 'black'}
                onClick={() => handleSelect(item, type, setSelectedItemsIds)}
              >
                <RowComponent item={item} isSelected={isSelected} />
              </Button>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
