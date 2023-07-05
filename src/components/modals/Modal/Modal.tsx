import { FC, ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import classNames from './Modal.module.pcss'
import { ModalHeader } from './ModalHeader'
import { fadeAnimation, fadeUpAnimation } from '../../../constants/animations'

export interface ModalProps {
  title: string
  show: boolean
  setShow: (show: boolean) => void
  children?: ReactNode
  size?: {
    width: number
    height: number
    maxWidth: number
    maxHeight: number
  }
  className?: {
    overlay?: string
    container?: string
  }
}

export const Modal: FC<ModalProps> = ({ title, show, setShow, size, children, className }) => (
  <AnimatePresence>
    {show && (
      <motion.div {...fadeAnimation} className={`${classNames.overlay} ${className?.overlay}`}>
        <motion.div
          {...fadeUpAnimation}
          className={`${classNames.container} ${className?.container}`}
          style={{ ...size }}
        >
          <ModalHeader title={title} onClick={() => setShow(false)} />
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)
