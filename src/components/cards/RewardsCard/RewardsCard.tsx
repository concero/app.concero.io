import { FC } from 'react'
import { IconMoneybag } from '@tabler/icons-react'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import classNames from './RewardsCard.module.pcss'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { CardHeader } from '../CardHeader/CardHeader'
import { useTranslation } from 'react-i18next'

interface RewardsCardProps {
	stakingState: StakingState
}

interface RewardsItemCardProps {
	item: {
		name: string
		logoURI: string
		value: string
	}
}

const RewardsItemCard: FC<RewardsItemCardProps> = ({ name, logoURI, value }) => (
	<div className={`card ${classNames.rewardsItemContainer}`}>
		<CryptoSymbol symbol={name} src={logoURI} />
		<div className={classNames.valueContainer}>
			<IconMoneybag size={16} color={'var(--color-primary-500)'} />
			{/* <p className="body1">{`${value}%`}</p> */}
		</div>
	</div>
)

export const RewardsCard: FC<RewardsCardProps> = ({ stakingState }) => {
	const { t } = useTranslation()

	if (!stakingState.selectedVault.rewardTokens || !stakingState.selectedVault.rewardTokens.length) {
		return null
	}

	return (
		<div className={classNames.container}>
			<CardHeader title={t('stakingDetailsCard.rewards')} />
			{stakingState.selectedVault.rewardTokens?.map(item => (
				<RewardsItemCard key={item.name} name={item.name} logoURI={item.logoURI} value={item.value} />
			))}
		</div>
	)
}
