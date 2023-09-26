export function TableHeader({ columns }) {
	return (
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
}
