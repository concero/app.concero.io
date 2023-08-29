import { FC, ReactNode } from 'react'
import { ErrorCard } from './ErrorCard'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  isOK?: boolean
  setIsOk?: (value: boolean) => void
}

export const Card: FC<CardProps> = ({ children, className = '', onClick = null, isOk, setIsOk }) => {
  return (
    <div className={`card ${className}`} onClick={onClick && onClick}>
      {isOk ? children : <ErrorCard setIsOk={setIsOk} />}
    </div>
  )
}
