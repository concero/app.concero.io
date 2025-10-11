import { useEffect, useRef, useState } from 'react'
import { HStack, VStack } from '../Stack'
import cls from './Table.module.pcss'
import clsx from 'clsx'

export type TColumn<TData, TKey extends string = string> = {
	key: TKey
	title: React.ReactNode
	width?: number
	renderHeader?: () => React.ReactNode
	renderCell?: (value: any, record: TData, index: number) => React.ReactNode
}

export type TTableProps<TData = any> = {
	className?: string
	columns: TColumn<TData>[]
	data?: TData[]
	showHeader?: boolean
}

export const Table = (props: TTableProps) => {
	const { className, columns, data = [], showHeader = true } = props
	const [showShadow, setShowShadow] = useState(true)
	const bodyRef = useRef<HTMLDivElement>(null)
	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
		const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 2
		setShowShadow(!isScrolledToBottom)
	}

	useEffect(() => {
		if (bodyRef.current) {
			const { scrollHeight, clientHeight } = bodyRef.current
			setShowShadow(scrollHeight > clientHeight)
		}
	}, [data])
	return (
		<VStack className={`${cls.table} ${className || ''}`}>
			{showHeader && (
				<HStack className={cls.table_header_row}>
					{columns.map(column => (
						<div key={column.key} className={cls.table_header_cell} style={{ width: column.width }}>
							{column.renderHeader ? column.renderHeader() : column.title}
						</div>
					))}
				</HStack>
			)}
			<VStack
				className={clsx(cls.table_body, {
					[cls.with_shadow]: showShadow,
				})}
				flexref={bodyRef}
				htmlProps={{
					onScroll: handleScroll,
				}}
				max
			>
				{data.map((record, rowIndex) => (
					<HStack key={rowIndex} className={cls.table_body_row} max>
						{columns.map(column => (
							<HStack
								key={column.key}
								className={cls.table_body_cell}
								htmlProps={{
									style: {
										width: column.width,
									},
								}}
								max
							>
								{column.renderCell
									? column.renderCell(record[column.key], record, rowIndex)
									: record[column.key]}
							</HStack>
						))}
					</HStack>
				))}
			</VStack>
		</VStack>
	)
}
