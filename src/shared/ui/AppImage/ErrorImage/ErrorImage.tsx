import cls from './ErrorImage.module.scss'
import clsx from 'clsx'

export const ErrorImage = ({ className, ...props }: any): JSX.Element => {
	// return <Icon {...props} className={clsx(cls.img, {}, [className])} Svg={NoImage} />
	return <span>Error image</span>
}
