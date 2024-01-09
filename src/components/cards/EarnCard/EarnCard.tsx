import classNames from './EarnCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { type Vault } from '../../screens/EarnScreen/earnReducer/types'
import { numberToFormatString, truncate } from '../../../utils/formatting'
import { CategoryTag } from '../../tags/CategoryTag/CategoryTag'
import { IconCurrencyDollar } from '@tabler/icons-react'

interface StakingCardProps {
	isSelected: boolean
	vault: Vault
	onClick: (id: string) => void
}

export const StakedAmountTag = ({ value }) => {
	return (
		<div className={classNames.stakedAmountInnerContainer}>
			<div>
				<IconCurrencyDollar size={16} color={'var(--color-primary-400'} />
			</div>
			<h5>{value}</h5>
		</div>
	)
}

export function EarnCard({ isSelected, vault, onClick }: StakingCardProps) {
	return (
		<div
			className={`${classNames.container} ${isSelected ? classNames.selected : ''}`}
			onClick={() => {
				onClick(vault)
			}}
		>
			<div>
				<div className={classNames.headerContainer}>
					<div className={classNames.headerSideContainer}>
						<Avatar src={vault.project?.logoURI} size="md" />
						<h5>{`${numberToFormatString(vault.data?.apy, 2)}%`}</h5>
						{vault.data?.category ? <CategoryTag category={vault.data?.category} isSelected={isSelected} /> : null}
					</div>
					{/* <div className={classNames.headerSideContainer}>{renderTags({ vault, isSelected })}</div> */}
				</div>
				<h5 className={`body1 ${isSelected ? classNames.selectedText : ''}`}>{truncate(vault.symbol, 25)}</h5>
			</div>
			{/* {vault.stakedAmount ? ( */}
			{/* 	<StakedAmountTag value={vault.stakedAmountUsd} /> */}
			{/* ) : ( */}
			{/* 	<UnderlyingTokens underlyingTokens={vault.input_tokens} isSelected={isSelected} /> */}
			{/* )} */}
		</div>
	)
}
