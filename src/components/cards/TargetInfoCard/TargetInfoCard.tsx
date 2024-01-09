import { useState } from 'react'
import { Card } from '../Card/Card'
import { NewsCard } from '../NewsCard/NewsCard'
import classNames from './TargetInfoContainer.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { IconChevronDown } from '@tabler/icons-react'
import { colors } from '../../../constants/colors'
import { WithPopover } from '../../wrappers/WithPopover'
import { MenuPopover } from '../../overlays/MenuPopover/MenuPopover'
import { TransactionsCard } from '../TransactionsCard/TransactionsCard'

enum CardTarget {
	news = 'News',
	transactions = 'Transaction history',
}

export function TargetInfoCard() {
	const [cardTarget, setCardTarget] = useState<CardTarget>(CardTarget.news)

	function menuPopover() {
		const items = [
			{
				title: CardTarget.news as string,
				onClick: () => {
					setCardTarget(CardTarget.news)
				},
			},
			{
				title: CardTarget.transactions as string,
				onClick: () => {
					setCardTarget(CardTarget.transactions)
				},
			},
		]

		return <MenuPopover items={items} />
	}

	function WrappedButton() {
		return (
			<Button variant={'black'} size={'sm'} rightIcon={<IconChevronDown size={16} color={colors.text.secondary} />}>
				<p className={'body1'}>{cardTarget}</p>
			</Button>
		)
	}

	const ButtonWithPopover = WithPopover(WrappedButton, menuPopover)

	const RenderComponent = {
		[CardTarget.news]: <NewsCard />,
		[CardTarget.transactions]: <TransactionsCard />,
	}

	return (
		<Card className={classNames.container}>
			{/* <CardHeader> */}
			{/* 	<ButtonWithPopover /> */}
			{/* </CardHeader> */}
			{RenderComponent[cardTarget]}
		</Card>
	)
}
