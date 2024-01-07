import { type CSSProperties, type FC } from 'react'
import { useTransition } from '@react-spring/web'
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
	animate?: boolean
}

export const Table: FC<TableProps> = ({ columns, items, isHeaderVisible = true, isLoading, onClick, onEndReached = null, animate = true }) => {
	const handleScroll = (e: any) => {
		const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
		if (bottom && onEndReached && !isLoading) {
			onEndReached()
		}
	}

	const transitions = useTransition(items, {
		from: {
			opacity: 0,
			transform: 'translate3d(0, -40px, 0)',
		},
		enter: {
			opacity: 1,
			transform: 'translate3d(0, 0px, 0)',
		},
		leave: {
			opacity: 0,
			transform: 'translate3d(0, -40px, 0)',
		},
		// keys: (item) => item.id,
		onRest: () => {
			// removes all transform translate3d from tr elements
			const trs = document.querySelectorAll('tr')
			trs.forEach(tr => {
				tr.style.transform = ''
			})
		},
	})

	return (
		<div className={classNames.container} onScroll={onEndReached && handleScroll}>
			{isLoading ? (
				<TableSkeleton columns={columns} />
			) : (
				<table>
					{isHeaderVisible && <TableHeader columns={columns} />}
					<tbody className="striped">
						{animate
							? transitions((styles, item) => <TableRow style={styles} item={item} columns={columns} onClick={onClick} />)
							: items.map((item, index) => <TableRow key={index} item={item} columns={columns} onClick={onClick} />)}
					</tbody>
				</table>
			)}
		</div>
	)
}
