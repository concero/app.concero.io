import { type FC } from 'react'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import className from './TxFromTo.module.pcss'

// todo: add chain icons component
export interface TxFromToProps {
	item: {
		from: {
			amount: string
			symbol: string
		}
		to: {
			amount: string
			symbol: string
		}
		type: string
	}
}

export const TxFromTo: FC<TxFromToProps> = ({ from, to, type }) => {
	const color = getColor(type)

	const styles = {
		text: {
			color,
		},
	}

	return (
		<div className={className.container}>
			<p style={styles.text}>{from.amount}</p>
			<p style={styles.text}>{from.symbol}</p>
			{type === 'sell' ? <IconArrowRight size={18} color={color} /> : <IconArrowLeft size={18} color={color} />}
			<p style={styles.text}>{to.amount}</p>
			<p style={styles.text}>{to.symbol}</p>
		</div>
	)
}
const getColor = (type: string) => {
	switch (type) {
		case 'sell':
			return 'var(--color-green-500)'
		case 'buy':
			return 'var(--color-red-500)'
		default:
			return 'var(--color-text-primary)'
	}
}
