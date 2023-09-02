import { FC } from 'react'
import * as Icons from 'tabler-icons-react'
import { IconProps } from 'tabler-icons-react'
import Icon from '../../Icon'
import { LoadingAnimation } from '../../layout/LoadingAnimation/LoadingAnimation'
import styles from './Button.module.pcss'

type IconComponentProps = {
  name: keyof typeof Icons
  iconProps?: Omit<IconProps, 'name'>
}

export type ButtonProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'sq-xs' | 'sq-sm' | 'sq-md' | 'sq-lg' | 'sq-xl'
  variant?: 'primary' | 'secondary' | 'filled' | 'subtle' | 'black'
  leftIcon?: IconComponentProps
  rightIcon?: IconComponentProps
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  isLoading?: boolean
  isDisabled?: boolean
  className?: string
  children?: React.ReactNode
}
const getButtonClasses = (
  size: ButtonProps['size'],
  variant: ButtonProps['variant'],
  isLoading: ButtonProps['isLoading'],
  isDisabled: ButtonProps['isDisabled'],
  className: ButtonProps['className'],
) => {
  const baseClasses = [styles.button]
  const sizeClass = size ? styles[size] : ''
  const variantClass = variant ? styles[variant] : ''
  const isLoadingClass = isLoading ? styles.isLoading : ''
  const isDisabledClass = isDisabled ? styles.isDisabled : ''
  const additionalClasses = className && className.split(' ')
  return baseClasses.concat(sizeClass, variantClass, isLoadingClass, isDisabledClass, additionalClasses).join(' ')
}

export const Button: FC<ButtonProps> = ({ size = 'md', variant = 'primary', leftIcon, rightIcon, isLoading, isDisabled, children, onClick, className }) => {
  const buttonClasses = getButtonClasses(size, variant, isLoading, isDisabled, className)

  return (
    <button className={buttonClasses} onClick={onClick}>
      {isLoading ? <LoadingAnimation /> : leftIcon && <Icon name={leftIcon.name} {...leftIcon.iconProps} />}
      {children}
      {rightIcon && <Icon name={rightIcon.name} {...rightIcon.iconProps} />}
    </button>
  )
}
