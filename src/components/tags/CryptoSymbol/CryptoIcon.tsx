import classNames from './CryptoSymbol.module.pcss'

export function CryptoIcon({ src = null, size = 'sm' }: { src?: string | null; size?: 'sm' | 'md' | 'lg' }) {
	const sizeClass = size ? classNames[size] : null

	return (
		<div className={`${classNames.iconContainer} ${sizeClass}`}>
			{src ? (
				<img
					src={src}
					onError={e => {
						e.target.src =
							'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="gray"%3E%3Crect width="100%" height="100%"%3E%3C/rect%3E%3C/svg%3E'
					}}
				/>
			) : null}
		</div>
	)
}
