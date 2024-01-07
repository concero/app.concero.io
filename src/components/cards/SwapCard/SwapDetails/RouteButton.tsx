import { type FC } from 'react'
import { IconChevronRight, IconClockHour3, IconPigMoney } from '@tabler/icons-react'
import { Button } from '../../../buttons/Button/Button'
import classNames from '../SwapCard.module.pcss'
import { Avatar } from '../../../tags/Avatar/Avatar'
import { type AvatarsProps, type RouteButtonProps } from '../types'
import { secondsConverter } from '../../../../utils/formatting'

const Avatars: FC<AvatarsProps> = ({ entities }) => (
	<div className={classNames.avatarContainer}>
		{entities?.map((entity, index) => (
			<div key={entity.id}>{index < 3 && <Avatar size="xs" src={entity?.tool.logo_uri} />}</div>
		))}
		{entities?.length > 3 && <p className="body1">{`+${entities?.length - 3}`}</p>}
	</div>
)

export const RouteButton: FC<RouteButtonProps> = ({ selectedRoute, onClick }) => (
	<div>
		<Button
			variant="subtle"
			rightIcon={<IconChevronRight size={16} color={'var(--color-text-secondary)'} />}
			size="sm"
			onClick={onClick}
			className={selectedRoute ? '' : classNames.invisible}
		>
			<Avatars entities={selectedRoute?.steps} />
			{selectedRoute?.cost.total_gas_usd ? (
				<div className={classNames.routeInfoContainer}>
					<IconPigMoney size="0.85rem" color={'var(--color-text-secondary)'} />
					<p className="body1">{`$${selectedRoute.cost.total_gas_usd}`}</p>
				</div>
			) : null}
			<div className={classNames.routeInfoContainer}>
				<IconClockHour3 size="0.85rem" color={'var(--color-text-secondary)'} />
				<p className="body1">{`${selectedRoute?.transaction_time_seconds ? secondsConverter(selectedRoute.transaction_time_seconds) : ''}`}</p>
			</div>
		</Button>
	</div>
)
