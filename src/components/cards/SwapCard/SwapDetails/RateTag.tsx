import { type FC } from 'react'
import classNames from '../SwapCard.module.pcss'
import { CryptoIcon } from '../../../tags/CryptoSymbol/CryptoIcon'
import { type Token } from '../types'

interface RateTagProps {
	from: Token
	to: Token
	rate: {
		from: string
		to: string
	}
	isLoading: boolean
}

export const RateTag: FC<RateTagProps> = ({ from, to, rate, isLoading }) => {
	const toTate = parseFloat(rate.to) === 0 ? '< 0.01' : rate.to
	const fromRate = parseFloat(rate.from) === 0 ? '< 0.01' : rate.from

	return (
		<div className={classNames.swapTagContainer}>
			{rate.from && rate.to && !isLoading ? (
				<>
					<div className={classNames.swapPriceTag}>
						<p className="body1">{fromRate}</p>
						<CryptoIcon src={from.logoURI} />
					</div>
					<p className={`body1 ${classNames.equalSign}`}>=</p>
					<div className={classNames.swapPriceTag}>
						<p className="body1">{toTate}</p>
						<CryptoIcon src={to.logoURI} />
					</div>
				</>
			) : null}
		</div>
	)
}
