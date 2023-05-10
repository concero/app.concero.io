import { FC } from 'react'
import styles from '../screens/ExchangeScreen/ExchangeScreen.module.pcss'

interface CardHeaderProps {
  title: string
  children?: React.ReactNode
}

export const CardHeader: FC<CardHeaderProps> = ({ title, children }) => {
  return (
    <div className={styles.cardHeader}>
      <h5>{title}</h5>
      {children}
    </div>
  )
}
