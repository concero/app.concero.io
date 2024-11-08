import { TrailArrowRightIcon } from '../../../../../assets/icons/TrailArrowRightIcon'
import classNames from './SwapProgressDetails.module.pcss'
import { type SwapStateDirection } from '../../swapReducer/types'
import { Badge } from '../../../../layout/Badge/Badge'

interface Props {
	from: SwapStateDirection
	to: SwapStateDirection
}

export const SwapProgressDetails = ({ from, to }: Props) => {
	return (
		<div className="row ac gap-sm">
			<div className={classNames.tokenBox}>
				<Badge size="xl" tokenLogoSrc={from.token.logoURI} chainLogoSrc={from.chain.logoURI} />
			</div>
			<TrailArrowRightIcon />
			<div className={classNames.tokenBox}>
				<Badge size="xl" tokenLogoSrc={to.token.logoURI} chainLogoSrc={to.chain.logoURI} />
			</div>
		</div>
	)
}
