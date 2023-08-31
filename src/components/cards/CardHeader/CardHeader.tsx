import { FC, ReactNode } from 'react'
import classNames from './CardHeader.module.pcss'
import { LoadingAnimation } from '../../layout/LoadingAnimation/LoadingAnimation'

interface CardHeaderProps {
  title: string
  children?: ReactNode
  isLoading?: boolean
}

export const CardHeader: FC<CardHeaderProps> = ({ title, children, isLoading = false }) => (
  <div className={classNames.cardHeader}>
    <div className={classNames.titleContainer}>
      <h5>{title}</h5>
      {isLoading && <LoadingAnimation color="secondary" size={20} />}
    </div>
    {children}
  </div>
)
