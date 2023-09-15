import { FC } from 'react'
import classNames from './Avatar.module.pcss'

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xs'
  src: string
  className?: string
}

const getClasses = (size: AvatarProps['size'], className: AvatarProps['className']) => {
  const baseClasses = [classNames.container]
  const sizeClass = size ? classNames[size] : ''
  const additionalClasses = className && className.split(' ')

  return baseClasses.concat(sizeClass, additionalClasses).join(' ')
}

export const Avatar: FC<AvatarProps> = ({ size, src, className }) => {
  return <div className={getClasses(size, className)}>{src ? <img src={src} className={classNames.avatar} /> : null}</div>
}
