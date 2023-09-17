import { FC, ReactNode } from 'react'
import classNames from './CardHeader.module.pcss'
import { LoadingAnimation } from '../../layout/LoadingAnimation/LoadingAnimation'
import { colors } from '../../../constants/colors'

interface CardHeaderProps {
  title: string
  children?: ReactNode
  isLoading?: boolean
}

export const CardHeader: FC<CardHeaderProps> = ({ title, children, isLoading = false }) => (
  <div className={classNames.cardHeader}>
    <div className={classNames.titleContainer}>
      <h5>{title}</h5>
      <div>{isLoading ? <LoadingAnimation size={13} color={colors.text.secondary} /> : null}</div>
    </div>
    {children}
  </div>
)
