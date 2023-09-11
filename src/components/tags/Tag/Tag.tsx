import { FC, MouseEvent, ReactNode } from 'react'

import className from './Tag.module.pcss'

type IconComponentProps = {
  name: string
}

export interface TagProps {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  color: 'red' | 'green' | 'grey' | 'main' | 'mainDarker' | 'recommended' | 'cheapest' | 'fastest' | 'transparent' | 'secondary'
  isLoading?: boolean
  children?: string | JSX.Element[] | JSX.Element
  size?: 'sm' | 'md' | 'lg' | 'xxs'
  title?: string
}

export const Tag: FC<TagProps> = ({ leftIcon, rightIcon, children, size, color, onClick, title = null }) => {
  const sizeClass = size ? className[size] : className.xs

  return (
    <div className={className.container} onClick={onClick || null} style={onClick ? { cursor: 'pointer' } : null}>
      <div className={`${className.tag}  ${sizeClass} ${className[color]}`}>
        {leftIcon}
        {children}
        {title ? <p className={className.title}>{title}</p> : null}
        {rightIcon}
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
