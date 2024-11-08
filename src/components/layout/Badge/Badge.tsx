import classNames from './Badge.module.pcss'

interface TokenBadgeProps {
	tokenLogoSrc: string
	chainLogoSrc?: string | null | undefined
	size?: 'xs' | 's' | 'm' | 'l' | 'xl'
	borderSmall?: boolean
}

const placeholder =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="gray"%3E%3Crect width="100%" height="100%"%3E%3C/rect%3E%3C/svg%3E'

export const Badge = ({ tokenLogoSrc, chainLogoSrc, borderSmall, size = 'm' }: TokenBadgeProps) => {
	const handleImgError = (e: any) => {
		e.target.src = placeholder
	}

	return (
		<div className={classNames.container}>
			<img
				src={tokenLogoSrc || ''}
				className={`${classNames.token} ${classNames[size]} ${borderSmall ? classNames.borderSmall : ''}`}
				alt="Token image"
				onError={handleImgError}
			/>
			{chainLogoSrc && <img src={chainLogoSrc} className={classNames.chain} alt="Chain image" />}
		</div>
	)
}
