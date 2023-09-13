import { FC, useEffect, useRef, useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { Modal } from '../Modal/Modal'
import classNames from './MultiselectModal.module.pcss'
import { MultiSelectModalProps } from './types'
import { TextInput } from '../../input/TextInput'

export const ListModal: FC<MultiSelectModalProps> = ({ getItems, isOpen, setIsOpen, title, RenderItem, selectedItems = [], onSelect }) => {
  const limit = 15
  const [offset, setOffset] = useState<number>(0)
  const [items, setItems] = useState<any[]>([])
  const itemsContainerRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setOffset(0) // Reset offset
      ;(async () => {
        const initialItems = await getItems(0, limit)
        setItems(initialItems)
      })()
    }
  }, [isOpen])

  const handleEndReached = async () => {
    const newOffset = offset + limit
    setOffset(newOffset)
    try {
      const newItems = await getItems(newOffset, limit)
      setItems((prevItems) => [...prevItems, ...newItems])
    } catch (error) {
      // Handle error appropriately
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop === clientHeight) {
      handleEndReached()
    }
  }

  return (
    <Modal show={isOpen} setShow={setIsOpen} title={title}>
      <div className={classNames.container}>
        <div className={classNames.inputContainer}>
          <TextInput icon={<IconSearch color="var(--color-text-secondary)" size={18} />} placeholder="Search..." />
        </div>
        <div className={classNames.itemsContainer} ref={itemsContainerRef} onScroll={handleScroll}>
          {items.map((item) => {
            const isSelected = selectedItems.includes(item)
            return <RenderItem key={item._id} item={item} isSelected={isSelected} onSelect={onSelect} />
          })}
        </div>
      </div>
    </Modal>
  )
}
