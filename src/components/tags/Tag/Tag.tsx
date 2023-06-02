import { FC, MouseEvent } from 'react'
import * as Icons from 'tabler-icons-react'
import { IconProps } from 'tabler-icons-react'
import className from './Tag.module.pcss'
import Icon from '../../Icon'
import { colors } from '../../../constants/colors'

type IconComponentProps = {
  name: keyof typeof Icons
  iconProps?: Omit<IconProps, 'name'>
}

export interface TagProps {
  leftIcon?: IconComponentProps
  rightIcon?: IconComponentProps
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  fgColor?: string
  bgColor?: string
  isLoading?: boolean
  children?: string | JSX.Element[] | JSX.Element
  size?: 'sn' | 'md' | 'lg'
}

export const Tag: FC<TagProps> = ({ fgColor, bgColor, leftIcon, rightIcon, children, size }) => {
  const sizeClass = size ? className[size] : className.xs

  return (
    <div className={className.container}>
      <div
        className={`${className.tag}  ${sizeClass}`}
        style={{ backgroundColor: bgColor, color: fgColor }}
      >
        {leftIcon && <Icon name={leftIcon.name} color={fgColor} {...leftIcon.iconProps} />}
        {children}
        {rightIcon && <Icon name={rightIcon.name} color={fgColor} {...rightIcon.iconProps} />}
      </div>
    </div>
  )
}

export function getSentimentFgColorByText(text: string): string | null {
  switch (text) {
    case 'bullish':
      return colors.green.main
    case 'bearish':
      return colors.red.dark
    case 'neutral':
      return colors.grey.medium
  }
  return null
}

export function getSentimentBgColorByText(text: string): string | null {
  switch (text) {
    case 'bullish':
      return colors.green.darkest
    case 'bearish':
      return colors.red.darkest
    case 'neutral':
      return colors.grey.darkest
  }
  return null
}

export function getSentimentIconByText(text: string): IconComponentProps | null {
  switch (text) {
    case 'bullish':
      return { name: 'ArrowUpRight', iconProps: { size: 18 } }
    case 'bearish':
      return { name: 'ArrowDownRight', iconProps: { size: 18 } }
    case 'neutral':
      return { name: 'Minus', iconProps: { size: 18 } }
  }
  return null
}
