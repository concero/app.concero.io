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

export const Avatar: FC<AvatarProps> = ({ size, src, className }) => (
  <div className={getClasses(size, className)}>
    <img src={src} alt="avatar" className={classNames.avatar} />
  </div>
)
