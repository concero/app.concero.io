import React, { FC, KeyboardEvent, ReactNode, useCallback, useEffect } from 'react'
import { animated, useSpring, useTransition } from '@react-spring/web'
import classNames from './Modal.module.pcss'
import { ModalHeader } from './ModalHeader'

export interface ModalProps {
  title: string
  show: boolean
  setShow: (show: boolean) => void
  children?: ReactNode
  onClose?: () => void
  isLoading?: boolean
}

export const Modal: FC<ModalProps> = ({ title, show, setShow, onClose, children, isLoading = false }) => {
  const stopPropagation = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShow(false)
      }
    },
    [setShow],
  )

  useEffect(() => {
    if (show) {
      document.body.style.overflowY = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.removeProperty('overflow-y')
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [show, handleKeyDown])

  const fadeAnimation = useSpring({
    opacity: show ? 1 : 0,
  })

  const transitions = useTransition(show, {
    from: { transform: 'translateY(20px)', opacity: 0 },
    enter: { transform: 'translateY(0)', opacity: 1 },
    leave: { transform: 'translateY(20px)', opacity: 0 },
  })

  return (
    show && (
      <animated.div style={fadeAnimation} className={classNames.overlay} onClick={() => setShow(false)}>
        {transitions((style, item) => (item ? (
          <animated.div style={style} className={classNames.container} onClick={stopPropagation}>
            <ModalHeader title={title} onClick={() => setShow(false)} isLoading={isLoading} />
            {children}
          </animated.div>
          ) : null))}
      </animated.div>
    )
  )
}
