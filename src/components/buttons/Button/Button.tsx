import { FC } from 'react'
import * as Icons from 'tabler-icons-react'
import { IconProps } from 'tabler-icons-react'
import Lottie from 'lottie-react'
import Icon from '../../Icon'
import loadingAnimation from '../../../assets/animations/circle-loading.json'

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

/**
 A customizable button component that can display icons and animations
 @param {string} [size='md'] - The size of the button. Can be one of 'sm', 'md', 'lg', or 'xl'.
 @param {string} [variant='primary'] - The variant of the button. Can be one of 'primary', 'secondary', 'subtle', or 'black'.
 @param {Object} [leftIcon] - The object describing the left icon displayed in the button. It contains a name property (which must match one of the icons from tabler-icons-react) and an optional iconProps property that gets passed to the Icon component.
 @param {Object} [rightIcon] - The object describing the right icon displayed in the button. It contains a name property (which must match one of the icons from tabler-icons-react) and an optional iconProps property that gets passed to the Icon component.
 @param {Function} [onClick] - The function to be called when the button is clicked.
 @param {boolean} [isLoading=false] - A boolean indicating whether the button is in a loading state.
 @param {boolean} [isDisabled=false] - A boolean indicating whether the button is disabled.
 @param {string} [className] - A string of additional CSS classes to apply to the button.
 @param {ReactNode} [children] - The children of the button.
 @returns {JSX.Element} - The rendered button element.
 @example
 <Button size={"lg"} leftIcon={{ name: 'ArrowsUpDown', iconProps: { size: 18 } }}>
 Swap
 </Button>
 */
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

function LoadingAnimation() {
  return (
    <Lottie
      loop
      autoplay
      animationData={loadingAnimation}
      style={{
        width: 30,
        height: 30,
      }}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice',
      }}
    />
  )
}
