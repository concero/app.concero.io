import { type FC } from 'react'
import { IconChevronRight, IconClockHour3, IconCoins } from '@tabler/icons-react'
import { type RouteButtonProps } from '../../types'
import { secondsConverter } from '../../../../../utils/formatting'
import classNames from './RouteButton.module.pcss'
import { Button } from '../../../../buttons/Button/Button'

export const RouteButton: FC<RouteButtonProps> = ({ selectedRoute, onClick }) => {
	return (
		<Button variant={'black'} className={classNames.container} size={'xs'} onClick={onClick}>
			{selectedRoute?.cost.total_gas_usd ? (
				<div className={classNames.routeInfoContainer}>
					<IconCoins size={12} color={'var(--color-text-secondary)'} />
					<p className="body1">{`$${selectedRoute.cost.total_gas_usd}`}</p>
				</div>
			) : null}
			<div className={classNames.routeInfoContainer}>
				<IconClockHour3 size={13} color={'var(--color-text-secondary)'} />
				<p className="body1">{`${
					selectedRoute?.transaction_time_seconds ? secondsConverter(selectedRoute.transaction_time_seconds) : ''
				}`}</p>
			</div>
			<IconChevronRight size={13} color={'var(--color-text-secondary)'} />
		</Button>
	)
}
