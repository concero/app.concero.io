import { FC, MouseEvent, useContext } from 'react'
import * as Icons from 'tabler-icons-react'
import { IconProps } from 'tabler-icons-react'
import className from './Tag.module.pcss'
import Icon from '../../Icon'
import { ThemeContext } from '../../../hooks/themeContext.tsx'

type IconComponentProps = {
  name: keyof typeof Icons
  iconProps?: Omit<IconProps, 'name'>
}

export interface TagProps {
  leftIcon?: IconComponentProps
  rightIcon?: IconComponentProps
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  color: 'red' | 'green' | 'gray'
  isLoading?: boolean
  children?: string | JSX.Element[] | JSX.Element
  size?: 'sn' | 'md' | 'lg'
}

export const getColors = (color: 'red' | 'green' | 'gray') => {
  const { colors } = useContext(ThemeContext)
  switch (color) {
    case 'red':
      return { fgColor: colors.red.dark, bgColor: colors.red.darkest }
    case 'green':
      return { fgColor: colors.green.main, bgColor: colors.green.darkest }
    case 'gray':
      return { fgColor: colors.grey.main, bgColor: colors.grey.darkest }
    default:
      return { fgColor: colors.grey.medium, bgColor: colors.grey.darkest }
  }
}

export const Tag: FC<TagProps> = ({ color, leftIcon, rightIcon, children, size }) => {
  const { fgColor, bgColor } = getColors(color)

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

export function getSentimentColorByText(text: string): string | null {
  switch (text) {
    case 'bullish':
      return 'green'
    case 'bearish':
      return 'red'
    case 'neutral':
      return 'grey'
    default:
      return 'grey'
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
    default:
      return { name: 'Minus', iconProps: { size: 18 } }
  }
  return null
}
