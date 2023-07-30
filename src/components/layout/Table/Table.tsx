import { CSSProperties, FC } from 'react'
import classNames from './Table.module.pcss'
import { TableSkeleton } from './TableSkeleton'
import { TableRow } from './TableRow'
import { TableHeader } from './TableHeader'

export interface TableColumn {
  columnTitle: string
  cellComponent: (item: any) => JSX.Element
  headerStyle?: CSSProperties
}

export interface TableProps {
  columns: TableColumn[]
  items: any[]
  isHeaderVisible?: boolean
  isLoading?: boolean
  onClick?: (item: any) => void
  onEndReached?: () => void
}

export const Table: FC<TableProps> = ({
  columns,
  items,
  isHeaderVisible = true,
  isLoading,
  onClick,
  onEndReached = null,
}) => {
  const handleScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom && onEndReached && !isLoading) {
      onEndReached()
    }
  }

  return (
    <div className={classNames.container} onScroll={onEndReached && handleScroll}>
      {isLoading ? (
        <TableSkeleton columns={columns} />
      ) : (
        <table>
          {isHeaderVisible && <TableHeader columns={columns} />}
          <tbody className="striped">
            {items.map((item, index) => (
              <TableRow key={index} item={item} columns={columns} onClick={onClick} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
