import { FC } from 'react'
import classNames from '../SwapCard.module.pcss'
import { CryptoIcon } from '../../../tags/CryptoSymbol/CryptoIcon'
import { Token } from '../types'

interface RateTagProps {
  from: Token
  to: Token
  rate: {
    from: string
    to: string
  }
  isLoading: boolean
}

export const RateTag: FC<RateTagProps> = ({ from, to, rate, isLoading }) => (
  <div className={classNames.swapTagContainer}>
    {rate.from && rate.to && !isLoading ? (
      <>
        <div className={classNames.swapPriceTag}>
          <p className={'body1'}>{rate.from}</p>
          <CryptoIcon src={from.logoURI} />
        </div>
        <p className={`body1 ${classNames.equalSign}`}>=</p>
        <div className={classNames.swapPriceTag}>
          <p className={'body1'}>{rate.to}</p>
          <CryptoIcon src={to.logoURI} />
        </div>
      </>
    ) : null}
  </div>
)
