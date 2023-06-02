import { FC, ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  classNames?: string
  onClick?: () => void
}

export const Card: FC<CardProps> = ({ children, classNames, onClick }) => {
  const classes: string = classNames ? `card ${classNames}` : 'card'

  return (
    <div className={classes} onClick={onClick && onClick}>
      {children}
    </div>
  )
}
