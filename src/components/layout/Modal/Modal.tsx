import { FC } from 'react'
import classNames from './Modal.module.pcss'
import Icon from '../../Icon'
import { colors } from '../../../constants/colors'

export interface ModalProps {
  title: string
}

export const Modal: FC<ModalProps> = ({ title }) => {
  return (
    <>
      <div className={classNames.container}>
        <div className={classNames.header}>
          <h5>{title}</h5>
          <Icon name="X" size={18} color={colors.text.primary} />
        </div>
      </div>

      <div className={classNames.overlay} />
    </>
  )
}
