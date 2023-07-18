import { FC } from 'react'
import { CryptoSymbolType } from '../../../types/CryptoSymbol'
import classNames from './CryptoSymbol.module.pcss'
import { CryptoIcon } from './CryptoIcon.tsx'

export interface CryptoSymbolProps {
  name?: CryptoSymbolType // TODO rename
  symbol: string
  src?: string | null
}

export const CryptoSymbol: FC<CryptoSymbolProps> = ({ name = '', symbol, src = null }) => {
  return (
    <div className={classNames.container}>
      <CryptoIcon symbol={name} src={src ? src : null} />
      <p className={'body1'}>{symbol}</p>
    </div>
  )
}
