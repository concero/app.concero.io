import { FC, MouseEvent } from 'react'
import * as Icons from 'tabler-icons-react'
import { IconProps } from 'tabler-icons-react'
import className from './Tag.module.pcss'
import Icon from '../../Icon'

type IconComponentProps = {
  name: keyof typeof Icons
  iconProps?: Omit<IconProps, 'name'>
}

export interface TagProps {
  leftIcon?: IconComponentProps
  rightIcon?: IconComponentProps
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  color: 'red' | 'green' | 'grey' | 'main' | 'mainDarker'
  isLoading?: boolean
  children?: string | JSX.Element[] | JSX.Element
  size?: 'sn' | 'md' | 'lg'
}

export const getColors = (color: 'red' | 'green' | 'grey' | 'main' | 'mainDarker') => {
  switch (color) {
    case 'red':
      return className.red
    case 'green':
      return className.green
    case 'grey':
      return className.grey
    case 'main':
      return className.main
    case 'mainDarker':
      return className.mainDarker
    default:
      return className.grey
  }
}

export const Tag: FC<TagProps> = ({ leftIcon, rightIcon, children, size, color }) => {
  const sizeClass = size ? className[size] : className.xs
  const colorClass = getColors(color)

  return (
    <div className={className.container}>
      <div className={`${className.tag}  ${sizeClass} ${colorClass}`}>
        {leftIcon && <Icon name={leftIcon.name} {...leftIcon.iconProps} />}
        {children}
        {rightIcon && <Icon name={rightIcon.name} {...rightIcon.iconProps} />}
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
}

export function getSentimentIconByText(text: string): IconComponentProps | null {
  switch (text) {
    case 'bullish':
      return {
        name: 'ArrowUpRight',
        iconProps: { size: 18 },
      }
    case 'bearish':
      return {
        name: 'ArrowDownRight',
        iconProps: { size: 18 },
      }
    case 'neutral':
      return {
        name: 'Minus',
        iconProps: { size: 18 },
      }
    default:
      return {
        name: 'Minus',
        iconProps: { size: 18 },
      }
  }
}
