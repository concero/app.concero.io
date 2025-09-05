import {
	CSSProperties,
	type ImgHTMLAttributes,
	memo,
	type ReactElement,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import cls from './AppImage.module.pcss'
import { ErrorImage as DefaultErrorFallback } from './ErrorImage/ErrorImage'
import clsx from 'clsx'
import { VStack } from '../Stack'
import { OmitTyped } from '@/shared/types/utils'
interface AppImageProps {
	className?: string
	src?: string
	alt?: string
	style?: CSSProperties | undefined
	/**
	 * React element displayed while the image is loading.
	 * Example: a spinner or skeleton placeholder.
	 */
	fallback?: ReactElement
	/**
	 * Local fallback image source (string path or imported asset).
	 * Will be rendered if the main image fails to load.
	 */
	fallbackSrc?: string
	/**
	 * React element or default error placeholder displayed when image fails to load.
	 * - If `true` → renders built-in `DefaultErrorFallback`.
	 * - If ReactElement → renders the provided custom element.
	 * - If undefined → renders nothing.
	 */
	errorFallback?: ReactElement | boolean
	/**
	 * Timeout in milliseconds before automatically retrying to reload the image
	 * after a failed loading attempt.
	 */
	retryTimeout?: number
	htmlProps?: OmitTyped<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'style'>
}

export const AppImage = memo((props: AppImageProps): JSX.Element => {
	const { className, errorFallback, fallback, retryTimeout, alt, src, style, fallbackSrc, htmlProps } = props
	const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading')
	const imgRef = useRef<HTMLImageElement>(null)
	const [reloadKey, setReloadKey] = useState(0)
	const timerRef = useRef<NodeJS.Timeout>()

	const loadImage = () => {
		if (!src) return
		setStatus('loading')
		const img = new Image()
		img.src = src + (reloadKey ? `?r=${reloadKey}` : '')
		img.onload = () => {
			setStatus('success')
			if (imgRef.current) {
				imgRef.current.src = img.src
			}
			clearTimeout(timerRef.current)
			setReloadKey(0)
		}

		img.onerror = e => {
			if (__IS_DEV__ && src !== '') {
				console.error('Failed to load image:', e, 'with source:', src)
			}
			setStatus('error')
			clearTimeout(timerRef.current)
			if (retryTimeout) {
				timerRef.current = setTimeout(() => {
					setReloadKey(k => k + 1)
				}, retryTimeout)
			}
		}
	}

	useLayoutEffect(() => {
		loadImage()
		return () => {
			clearTimeout(timerRef.current)
			setStatus('loading')
		}
	}, [src, reloadKey])

	const renderFallback = () => {
		if (status === 'loading' && reloadKey === 0 && fallback) return fallback

		if (status === 'error' || (status === 'loading' && reloadKey !== 0)) {
			if (fallbackSrc) {
				return <img src={fallbackSrc} alt={alt} className={clsx(cls.img, className)} {...htmlProps} />
			}

			if (errorFallback && typeof errorFallback !== 'boolean') {
				return errorFallback
			}
			if (errorFallback === true) {
				return <DefaultErrorFallback className={className} alt={alt} {...htmlProps} />
			}
		}
		return null
	}

	return (
		<VStack align="center" justify="center" className={className} style={style}>
			{renderFallback()}
			<img
				className={clsx(
					cls.img,
					{
						[cls.hidden ?? '']: status !== 'success',
					},
					[className],
				)}
				ref={imgRef}
				alt={alt}
				{...htmlProps}
			/>
		</VStack>
	)
})
