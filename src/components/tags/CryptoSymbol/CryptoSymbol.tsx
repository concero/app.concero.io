import { type FC } from 'react'
import classNames from './CryptoSymbol.module.pcss'
import { CryptoIcon } from './CryptoIcon.tsx'

export interface CryptoSymbolProps {
	symbol?: string
	src?: string | null
	size?: 'sm' | 'md' | 'lg'
}

export const CryptoSymbol: FC<CryptoSymbolProps> = ({ symbol = null, src = null, size }) => {
	return (
		<div className={classNames.container}>
			<CryptoIcon src={src ?? null} size={size} />
			{symbol ? <p className="body1">{symbol}</p> : null}
		</div>
	)
}
