import { type FC } from 'react'
import { IconChevronRight, IconClockHour3, IconCoins } from '@tabler/icons-react'
import { type RouteButtonProps } from '../../types'
import { secondsConverter } from '../../../../../utils/formatting'
import classNames from './RouteButton.module.pcss'

export const RouteButton: FC<RouteButtonProps> = ({ selectedRoute, onClick }) => {
	return (
		<div className={classNames.container} onClick={onClick}>
			{selectedRoute?.cost.total_gas_usd ? (
				<div className={classNames.routeInfoContainer}>
					<IconCoins size="0.95rem" color={'var(--color-text-secondary)'} />
					<p className="body3">{`$${selectedRoute.cost.total_gas_usd}`}</p>
				</div>
			) : null}
			<div className={classNames.routeInfoContainer}>
				<IconClockHour3 size="0.95rem" color={'var(--color-text-secondary)'} />
				<p className="body3">{`${
					selectedRoute?.transaction_time_seconds ? secondsConverter(selectedRoute.transaction_time_seconds) : ''
				}`}</p>
			</div>
			<IconChevronRight size="0.95rem" color={'var(--color-text-secondary)'} />
		</div>
	)
}
