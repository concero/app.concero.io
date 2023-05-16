import { FC } from 'react'
import classNames from './CardHeader.module.pcss'

interface CardHeaderProps {
  title: string
  children?: React.ReactNode
}

export const CardHeader: FC<CardHeaderProps> = ({ title, children }) => (
  <div className={classNames.cardHeader}>
    <h5>{title}</h5>
    {children}
  </div>
)
