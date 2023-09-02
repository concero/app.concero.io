import { CryptoSymbolType } from '../../../types/CryptoSymbol'
import classNames from './CryptoSymbol.module.pcss'

export function CryptoIcon({ symbol, src = null }: { symbol: CryptoSymbolType; src?: string | null }) {
  return (
    <div className={classNames.iconContainer}>
      {src ? <img src={src} /> : <object data={`src/assets/cryptoSymbols/${symbol}.svg`} type="image/svg+xml" width={18} height={18} />}
    </div>
  )
}
