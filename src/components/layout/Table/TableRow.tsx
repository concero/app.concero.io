import { TableCell } from './TableCell'

export function TableRow({ item, columns, onClick }) {
  return (
    <tr className="hover-dim" onClick={() => onClick && onClick(item)}>
      {columns.map((column, index) => (
        <TableCell key={index} item={item} column={column} />
      ))}
    </tr>
  )
}
