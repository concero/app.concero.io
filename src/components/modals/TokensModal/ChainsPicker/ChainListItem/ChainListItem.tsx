import type { Chain } from '../../../../../api/concero/types'
import { Button } from '../../../../buttons/Button/Button'
import { CryptoSymbol } from '../../../../tags/CryptoSymbol/CryptoSymbol'
import classNames from './ChainListItem.module.pcss'

interface ChainItemProps {
	chain: Chain
	isSelected: boolean
	onSelect: (param: Chain) => void
	isCropped?: boolean
}

export function ChainListItem({ chain, isSelected, onSelect, isCropped = true }: ChainItemProps) {
	return (
		<div
			className={classNames.container}
			onClick={() => {
				onSelect(chain)
			}}
		>
			<Button variant={isSelected ? 'light' : 'black'} className={classNames.chainButton}>
				<CryptoSymbol src={chain.logoURI} size={'md'} id={`crypto-symbol-${chain.id}`} />
			</Button>
			{!isCropped ? (
				<div className={classNames.titleContainer}>
					<h4>{chain.name}</h4>
				</div>
			) : null}
		</div>
	)
}
