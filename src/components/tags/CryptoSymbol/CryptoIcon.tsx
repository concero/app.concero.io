import { CryptoSymbolType } from '../../../types/CryptoSymbol'
import classNames from './CryptoSymbol.module.pcss'

export function CryptoIcon({ symbol }: { symbol: CryptoSymbolType }) {
  return (
    <div className={classNames.iconContainer}>
      <object
        data={`src/assets/cryptoSymbols/${symbol}.svg`}
        type="image/svg+xml"
        width={18}
        height={18}
      />
    </div>
  )
}
