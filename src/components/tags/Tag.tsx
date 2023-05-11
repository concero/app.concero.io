import { FC, MouseEvent } from 'react'
import className from './Tag.module.pcss'
import * as Icons from 'tabler-icons-react'
import { IconProps } from 'tabler-icons-react'
import Icon from '../Icon'

export interface TagProps {}

className

type IconComponentProps = {
  name: keyof typeof Icons
  iconProps?: Omit<IconProps, 'name'>
}

type TagSize = {
  sm?: boolean
  md?: boolean
  lg?: boolean
  xl?: boolean
}

type TagVariant = {
  primary?: boolean
  secondary?: boolean
}

export interface TagProps extends TagSize, TagVariant {
  leftIcon?: IconComponentProps
  rightIcon?: IconComponentProps
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  fgColor?: string
  bgColor?: string
  isLoading?: boolean
  children?: string
}

export const Tag: FC<TagProps> = ({
  sm,
  md,
  lg,
  xl,
  primary,
  secondary,
  fgColor,
  bgColor,
  leftIcon,
  rightIcon,
  children,
}) => {
  const classes = [className.container]
  if (sm) classes.push(className.sm)
  if (md) classes.push(className.md)
  if (lg) classes.push(className.lg)
  if (xl) classes.push(className.xl)
  if (primary) classes.push(className.primary)
  if (secondary) classes.push(className.secondary)

  return (
    <div className={className.container} style={{ backgroundColor: bgColor, color: fgColor }}>
      {leftIcon && <Icon name={leftIcon.name} color={fgColor} {...leftIcon.iconProps} />}
      {children}
      {rightIcon && <Icon name={rightIcon.name} color={fgColor} {...rightIcon.iconProps} />}
    </div>
  )
}
