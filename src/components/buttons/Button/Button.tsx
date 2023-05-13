import { FC, MouseEvent, ReactNode } from 'react'
import * as Icons from 'tabler-icons-react'
import { IconProps } from 'tabler-icons-react'
import Icon from '../../Icon'
import Lottie from 'lottie-react'
import loadingAnimation from '../../../assets/animations/circle-loading.json'

import styles from './Button.module.pcss'

type IconComponentProps = {
  name: keyof typeof Icons
  iconProps?: Omit<IconProps, 'name'>
}

type ButtonSize = {
  sm?: boolean
  md?: boolean
  lg?: boolean
  xl?: boolean
}

type ButtonVariant = {
  primary?: boolean
  secondary?: boolean
  subtle?: boolean
  black?: boolean
}

export interface ButtonProps extends ButtonSize, ButtonVariant {
  leftIcon?: IconComponentProps
  rightIcon?: IconComponentProps
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  isLoading?: boolean
  className?: string
  children?: ReactNode
}

export const Button: FC<ButtonProps> = ({
  sm,
  md,
  lg,
  xl,
  primary,
  secondary,
  subtle,
  black,
  leftIcon,
  rightIcon,
  isLoading,
  children,
  onClick,
  className,
}) => {
  const buttonClasses = [styles.button]
  if (sm) buttonClasses.push(styles.sm)
  if (md) buttonClasses.push(styles.md)
  if (lg) buttonClasses.push(styles.lg)
  if (xl) buttonClasses.push(styles.xl)
  if (primary) buttonClasses.push(styles.primary)
  if (secondary) buttonClasses.push(styles.secondary)
  if (subtle) buttonClasses.push(styles.subtle)
  if (black) buttonClasses.push(styles.black)
  if (isLoading) buttonClasses.push(styles.isLoading)
  if (className) buttonClasses.push(className)
  return (
    <button className={buttonClasses.join(' ')} onClick={onClick}>
      {isLoading ? <LoadingAnimation /> : leftIcon && <Icon name={leftIcon.name} {...leftIcon.iconProps} />}
      {children}
      {rightIcon && <Icon name={rightIcon.name} {...rightIcon.iconProps} />}
    </button>
  )
}

const LoadingAnimation: FC = () => {
  return (
    <Lottie
      loop
      autoplay
      animationData={loadingAnimation}
      style={{ width: 30, height: 30 }}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice',
      }}
    />
  )
}
