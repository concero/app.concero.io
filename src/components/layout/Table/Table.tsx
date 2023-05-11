import { TxFromTo } from './TxFromTo'
import './Table.module.pcss'

export const Table = ({ columns, data }) => (
  <div>
    <table>
      <TableHeader columns={columns} />
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index} item={item} columns={columns} />
        ))}
      </tbody>
    </table>
  </div>
)

const TableHeader = ({ columns }) => (
  <thead>
    <tr>
      {columns.map((column, index) => (
        <th key={index}>{column.column_title}</th>
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
  const value = column.data(item)
  const { column_type, onChange, style } = column
  switch (column_type) {
    case 'plain_text':
      return (
        <td>
          <p style={style}>{value}</p>
        </td>
      )
    case 'tx_from_to':
      return <TxFromTo item={item} />

    default:
      return <td />
  }
}
