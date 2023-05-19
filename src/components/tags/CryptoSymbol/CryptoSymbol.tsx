import { FC } from 'react'

import { CryptoSymbolType } from '../../../types/CryptoSymbol'
import classNames from './CryptoSymbol.module.pcss'
import { CryptoIcon } from './CryptoIcon.tsx'

export interface CryptoSymbolProps {
  name: CryptoSymbolType // TODO rename
  symbol: string
}

export const CryptoSymbol: FC<CryptoSymbolProps> = ({ name, symbol }) => (
  <div className={classNames.container}>
    <CryptoIcon symbol={name} />
    <p>{symbol}</p>
  </div>
)
