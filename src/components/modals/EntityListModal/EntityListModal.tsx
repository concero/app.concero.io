// todo: remove when api connected
import { FC, useEffect, useState } from 'react'
import { TextInput } from '../../input/TextInput'
import { Table } from '../../layout/Table/Table'
import { Modal } from '../Modal/Modal'
import classNames from './EntityListModal.module.pcss'

export interface EntityListModalProps {
  title: string
  data: any[]
  visibleData?: any[]
  columns: any[]
  show: boolean
  setShow: (show: boolean) => void
  onSelect: (item: any) => void
  onEndReached?: () => void
}

export const EntityListModal: FC<EntityListModalProps> = ({
  title,
  data,
  visibleData = null,
  columns,
  show,
  setShow,
  onSelect,
  onEndReached = null,
}) => {
  const [filteredData, setFilteredData] = useState<any[]>(visibleData ? visibleData : data)
  const [value, setValue] = useState<string>('')

  function filter(name) {
    setValue(name)

    if (!name) return setFilteredData(visibleData || data)

    const newData = data.filter((chain) => chain.name.toLowerCase().includes(name.toLowerCase()))
    setFilteredData(newData)
  }

  const handleSelect = (item) => {
    onSelect(item)
    setShow(false)
  }

  useEffect(() => {
    setFilteredData(visibleData ? visibleData : data)
  }, [visibleData || data])

  return (
    <Modal title={title} show={show} setShow={setShow}>
      <div className={classNames.container}>
        <TextInput iconName="Search" value={value} placeholder="Search chain" onChangeText={(val) => filter(val)} />
        <Table
          columns={columns}
          items={filteredData}
          onClick={(item) => handleSelect(item)}
          onEndReached={onEndReached && onEndReached}
        />
      </div>
    </Modal>
  )
}
