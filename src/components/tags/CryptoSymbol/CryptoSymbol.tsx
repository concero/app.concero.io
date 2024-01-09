import { type FC } from 'react'
import classNames from './CryptoSymbol.module.pcss'
import { CryptoIcon } from './CryptoIcon.tsx'

export interface CryptoSymbolProps {
	symbol: string
	src?: string | null
}

export const CryptoSymbol: FC<CryptoSymbolProps> = ({ symbol, src = null }) => (
	<div className={classNames.container}>
		<CryptoIcon src={src ?? null} />
		<p className="body1">{symbol}</p>
	</div>
)
