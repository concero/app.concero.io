import { type FC } from 'react'
import classNames from './CryptoSymbol.module.pcss'
import { CryptoIcon } from './CryptoIcon'

export interface CryptoSymbolProps {
	symbol?: string
	src?: string | null
	size?: 'sm' | 'md' | 'lg' | 'xl'
	id?: string
}

export const CryptoSymbol: FC<CryptoSymbolProps> = ({ symbol = null, src = null, size, id }) => {
	return (
		<div className={classNames.container}>
			<CryptoIcon src={src ?? null} size={size} id={id} />
			{symbol ? <p className="body1">{symbol}</p> : null}
		</div>
	)
}
