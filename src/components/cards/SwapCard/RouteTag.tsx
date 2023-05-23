import { FC } from 'react'
import classNames from './SwapCard.module.pcss'
import { CryptoIcon } from '../../tags/CryptoSymbol/CryptoIcon.tsx'

interface RateTagProps {
  from: Token
  to: Token
  rate: {
    from: string
    to: string
  }
}

export const RateTag: FC<RateTagProps> = ({ from, to, rate }) => (
  <div className={classNames.swapTagContainer}>
    <div className={classNames.swapPriceTag}>
      <p>{rate.from}</p>
      <CryptoIcon symbol={from.name} />
    </div>
    <p className={classNames.equalSign}>=</p>
    <div className={classNames.swapPriceTag}>
      <p>{rate.to}</p>
      <CryptoIcon symbol={to.name} />
    </div>
  </div>
)
