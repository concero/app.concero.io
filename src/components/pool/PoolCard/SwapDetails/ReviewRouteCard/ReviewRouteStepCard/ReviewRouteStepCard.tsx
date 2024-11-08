import classNames from './ReviewRouteStepCard.module.pcss'
import { type Direction } from '../../../../../../types/StandardRoute'
import { TokenIcon } from '../../../../../layout/TokenIcon/TokenIcon'

interface RouteStepCardProps {
	direction: Direction
}

export function ReviewRouteStepCard({ direction }: RouteStepCardProps) {
	return (
		<div className={classNames.container}>
			<TokenIcon tokenLogoSrc={direction.token?.logo_uri!} chainLogoSrc={direction.chain.logo_uri} />
		</div>
	)
}
