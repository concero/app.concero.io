import type { Chain } from '../../../../../api/concero/types'
import classNames from './ChainListItem.module.pcss'
import { config } from '../../../../../constants/config'
import { useTranslation } from 'react-i18next'

interface ChainItemProps {
	chain: Chain
	isSelected: boolean
	onSelect: (param: Chain) => void
	isCropped?: boolean
}

function ChainIcon({ src }: { src: string }) {
	return (
		<div className={classNames.chainIcon}>
			<img src={src} />
		</div>
	)
}

export function ChainListItem({ chain, isSelected, onSelect, isCropped = true }: ChainItemProps) {
	const { t } = useTranslation()

	return (
		<div
			className={`${classNames.container} ${isCropped ? classNames.cropped : ''}`}
			onClick={() => {
				onSelect(chain)
			}}
		>
			<div className={`${classNames.chainButton} ${isSelected ? classNames.selected : null}`}>
				{isSelected ? (
					<ChainIcon src={`${config.CONCERO_ASSETS_URI}/icons/chains/filled/${chain.id}.svg`} />
				) : (
					<ChainIcon src={chain.logoURI} />
				)}
			</div>
			{!isCropped ? (
				<div>
					<h4>{chain.name}</h4>
					{isSelected ? <p className={'body1'}>{t('tokensModal.selected')}</p> : null}
				</div>
			) : null}
		</div>
	)
}
