import { FC, useState } from 'react'
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
  const [imgSrc, setImgSrc] = useState(src)

  function handleError() {
    setImgSrc(null)
  }

  return <div className={getClasses(size, className)}>{imgSrc ? <img src={src} className={classNames.avatar} onError={handleError} /> : null}</div>
}
