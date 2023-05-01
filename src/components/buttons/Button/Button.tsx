import { FC, MouseEvent, ReactNode } from 'react'
import * as Icons from 'tabler-icons-react'
import { IconProps } from 'tabler-icons-react'
import Icon from '../../Icon'
import Lottie from 'lottie-react'
import * as loadingAnimation from '../../../assets/animations/circle-loading.json'
import styles from './Button.module.css'

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
}

export interface ButtonProps extends ButtonSize, ButtonVariant {
  leftIcon?: IconComponentProps
  rightIcon?: IconComponentProps
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  isLoading?: boolean
  children?: ReactNode
}

export const Button: FC<ButtonProps> = ({
  sm,
  md,
  lg,
  xl,
  primary,
  secondary,
  leftIcon,
  rightIcon,
  onClick,
  isLoading,
  children,
}) => {
  const buttonClasses = [styles.button]
  if (sm) buttonClasses.push(styles.sm)
  if (md) buttonClasses.push(styles.md)
  if (lg) buttonClasses.push(styles.lg)
  if (xl) buttonClasses.push(styles.xl)
  if (primary) buttonClasses.push(styles.primary)
  if (secondary) buttonClasses.push(styles.secondary)

  return (
    <button className={buttonClasses.join(' ')} onClick={onClick}>
      {leftIcon && <Icon name={leftIcon.name} {...leftIcon.iconProps} />}
      {children}
      {isLoading ? (
        <Lottie
          loop
          autoplay
          animationData={loadingAnimation}
          width={30}
          height={30}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice',
          }}
        />
      ) : (
        rightIcon && <Icon name={rightIcon.name} {...rightIcon.iconProps} />
      )}
    </button>
  )
}
