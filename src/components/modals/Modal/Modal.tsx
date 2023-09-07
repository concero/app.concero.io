import { FC, KeyboardEvent, MouseEventHandler, ReactNode, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import classNames from './Modal.module.pcss'
import { ModalHeader } from './ModalHeader'
import { fadeAnimation, fadeUpAnimation } from '../../../constants/animations'

export interface ModalProps {
  title: string
  show: boolean
  setShow: (show: boolean) => void
  children?: ReactNode
}

export const Modal: FC<ModalProps> = ({ title, show, setShow, children }) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 27) setShow(false)
  }

  const stopPropagation = (event: MouseEventHandler<HTMLDivElement>) => {
    event.stopPropagation()
  }

  useEffect(() => {
    if (show) {
      document.body.style.overflowY = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.removeProperty('overflow-y')
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div {...fadeAnimation} className={classNames.overlay} onClick={() => setShow(false)}>
          <motion.div {...fadeUpAnimation} className={classNames.container} onClick={stopPropagation}>
            <ModalHeader title={title} onClick={() => setShow(false)} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
