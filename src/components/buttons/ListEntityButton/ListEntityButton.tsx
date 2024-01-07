import { type FC } from 'react'
import { IconCheck } from '@tabler/icons-react'
import classNames from './ListEntityButton.module.pcss'
import { CryptoIcon } from '../../tags/CryptoSymbol/CryptoIcon'
import { colors } from '../../../constants/colors'
import { Button } from '../Button/Button'

interface ChainSelectionRowProps {
	item: any
	isSelected: boolean
	onSelect: (item: any) => void
}

export const ListEntityButton: FC<ChainSelectionRowProps> = ({ item, isSelected, onSelect }) => (
	<Button
		key={item.id}
		variant={isSelected ? 'filled' : 'black'}
		onClick={() => {
			onSelect(item)
		}}
	>
		<div className={classNames.selectItemContainer}>
			<div className={classNames.infoContainer}>
				<CryptoIcon src={item.logoURI} />
				<h5>{item.name}</h5>
				<h5 className="body1" style={isSelected ? { color: colors.primary.light } : null}>
					{item.symbol}
				</h5>
			</div>
			<div>{isSelected ? <IconCheck size={16} /> : null}</div>
		</div>
	</Button>
)
