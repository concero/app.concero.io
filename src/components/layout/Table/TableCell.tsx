export function TableCell({ item, column }) {
	const CellComponent = column.cellComponent(item)
	return <td>{CellComponent}</td>
}
