import classNames from './Table.module.pcss'
import { FC, useEffect, useState } from 'react'

export interface TableColumn {
  columnTitle: string
  cellComponent: (item: any) => JSX.Element
  headerStyle?: React.CSSProperties
}

export interface TableProps {
  columns: TableColumn[]
  data: never[]
  isHeaderVisible?: boolean
}

export const Table: FC<TableProps> = ({ columns, data, isHeaderVisible = true }) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(false)
  }, [])
  return (
    <div className={classNames.container}>
      {isLoading ? (
        <TableSkeleton columns={columns} />
      ) : (
        <table>
          {isHeaderVisible && <TableHeader columns={columns} />}
          <tbody>
            {data.map((item, index) => (
              <TableRow key={index} item={item} columns={columns} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const TableHeader = ({ columns }) => (
  <thead>
    <tr>
      {columns.map((column, index) => (
        <th key={index} style={column.headerStyle}>
          {column.columnTitle}
        </th>
      ))}
    </tr>
  </thead>
)

const TableRow = ({ item, columns }) => (
  <tr className={'hover-dim'}>
    {columns.map((column, index) => (
      <TableCell key={index} item={item} column={column} />
    ))}
  </tr>
)

const TableCell = ({ item, column }) => {
  const CellComponent = column.cellComponent(item)
  return <td>{CellComponent}</td>
}

const TableSkeleton = ({ columns }) => (
  <div className={classNames.skeletonTable}>
    <div className={classNames.skeletonHeader}>
      {columns.map((column, index) => (
        <div key={index} className={classNames.skeletonHeaderCell}></div>
      ))}
    </div>

    <div className={classNames.skeletonColumns}>
      {[...Array(10)].map((_, index) => (
        <div key={index} className={classNames.skeletonCell}></div>
      ))}
    </div>
  </div>
)
