import { FC } from 'react'
import Icon from '../../Icon'
import { ButtonProps } from './types'
import { LoadingAnimation } from '../../layout/LoadingAnimation/LoadingAnimation'
import { getButtonClasses } from './getButtonClasses'

export const Button: FC<ButtonProps> = ({
  size = 'md',
  variant = 'primary',
  leftIcon,
  rightIcon,
  isLoading,
  isDisabled,
  children,
  onClick,
  className,
}) => {
  const buttonClasses = getButtonClasses(size, variant, isLoading, isDisabled, className)

  return (
    <button className={buttonClasses} onClick={onClick}>
      {isLoading ? <LoadingAnimation /> : leftIcon && <Icon name={leftIcon.name} {...leftIcon.iconProps} />}
      {children}
      {rightIcon && <Icon name={rightIcon.name} {...rightIcon.iconProps} />}
    </button>
  )
}
