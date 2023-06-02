// todo: remove when api connected
import { FC, useState } from 'react'
import { TextInput } from '../input/TextInput'
import { Table } from '../layout/Table/Table'
import { Modal } from './Modal/Modal'

export interface EntityListModalProps {
  title: string
  data: any[]
  columns: any[]
  show: boolean
  setShow: (show: boolean) => void
  onSelect: (item: any) => void
}

export const EntityListModal: FC<EntityListModalProps> = ({
  title,
  data,
  columns,
  show,
  setShow,
  onSelect,
}) => {
  const [filteredData, setFilteredData] = useState<any[]>(data)

  function filter(name) {
    const newData = data.filter((chain) => chain.name.toLowerCase().includes(name.toLowerCase()))
    setFilteredData(newData)
  }

  return (
    <Modal title={title} show={show} setShow={setShow} size={{ width: 400, height: 400 }}>
      <TextInput
        iconName="Search"
        value=""
        placeholder="Search chain"
        onChangeText={(val) => filter(val)}
      />
      <Table columns={columns} data={filteredData} onClick={(item) => onSelect(item)} />
    </Modal>
  )
}
