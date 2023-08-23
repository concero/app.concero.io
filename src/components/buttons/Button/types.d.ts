import * as Icons from 'tabler-icons-react'
import { IconProps } from 'tabler-icons-react'
import { ReactNode } from 'react'

export type ButtonProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'sq-xs' | 'sq-sm' | 'sq-md' | 'sq-lg' | 'sq-xl'
  variant?: 'primary' | 'secondary' | 'filled' | 'subtle' | 'black'
  leftIcon?: IconComponentProps
  rightIcon?: IconComponentProps
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  isLoading?: boolean
  isDisabled?: boolean
  className?: string
  children?: ReactNode
}

type IconComponentProps = {
  name: keyof typeof Icons
  iconProps?: Omit<IconProps, 'name'>
}
