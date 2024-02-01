import classNames from './RouteStepCard.module.pcss'
import { type Direction } from '../../../../../../types/StandardRoute'
import { TokenIcon } from '../../../../../layout/TokenIcon/TokenIcon'
import { config } from '../../../../../../constants/config'

interface RouteStepCardProps {
	direction: Direction
}

export function RouteStepCard({ direction }: RouteStepCardProps) {
	return (
		<div className={classNames.container}>
			<TokenIcon
				tokenLogoSrc={direction.token?.logo_uri!}
				chainLogoSrc={`${config.CONCERO_ASSETS_URI}/icons/chains/filled/${direction.chain.id}.svg`}
			/>
		</div>
	)
}
