import { type ReactElement } from 'react'
import { Button } from '../../buttons/Button/Button'
import classNames from './BTCCard.module.pcss'
import { HeartIcon } from '../../../assets/icons/HeartIcon'

interface BTCCardProps {
	onClick: () => void
}

const BTCCard = ({ onClick }: BTCCardProps): ReactElement => {
	return (
		<div className={classNames.btc_card__container}>
			<div className={classNames.btc_card__content}>
				<div className={classNames.btc_card__icon_wrapper}>
					<HeartIcon />
				</div>
				<div className={classNames.btc_card__content__text_container}>
					<div className={classNames.btc_card__content__heading}>
						<p>$BTC has reached 100,000! - 100 CERs</p>
					</div>
					<div className={classNames.btc_card__content__subheading}>
						<p>
							As $BTC makes a huge price landmark of $100k, the Intern has kept his promise for dropping
							100 CERs to all Lancans
						</p>
					</div>
				</div>
			</div>
			<Button variant="primary" onClick={onClick}>
				Claim
			</Button>
		</div>
	)
}

export default BTCCard
