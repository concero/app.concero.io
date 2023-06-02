import { FC } from 'react'
import classNames from './Avatar.module.pcss'

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xs'
  src: string
  className?: string
}

const getAvatarClasses = (size: AvatarProps['size'], className: AvatarProps['className']) => {
  const baseClasses = [classNames.avatar]
  const sizeClass = size ? classNames[size] : ''
  const additionalClasses = className && className.split(' ')

  return baseClasses.concat(sizeClass, additionalClasses).join(' ')
}

export const Avatar: FC<AvatarProps> = ({ size, src, className }) => (
  <img src={src} alt="avatar" className={getAvatarClasses(size, className)} />
)
