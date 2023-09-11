import { CryptoSymbolType } from '../../../types/CryptoSymbol'
import classNames from './CryptoSymbol.module.pcss'

export function CryptoIcon({ symbol, src = null }: { symbol: CryptoSymbolType; src?: string | null }) {
  return (
    <div className={classNames.iconContainer}>
      <img src={src} alt={symbol} />
    </div>
  )
}
