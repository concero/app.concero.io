import { FC, ReactNode, useRef } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const Card: FC<CardProps> = ({ children, className, onClick }) => (
  // const cardRef = useRef()

  // const handleMouseMove = (event) => {
  //   const rect = cardRef.current.getBoundingClientRect()
  //   const x = event.clientX - rect.left // x position within the element.
  //   const y = event.clientY - rect.top // y position within the element.
  //   const xp = Math.round((x / rect.width) * 100)
  //   const yp = Math.round((y / rect.height) * 100)
  //   cardRef.current.style.backgroundPosition = `${100 - xp}% ${100 - yp}%`
  //   cardRef.current.style.backgroundImage = 'radial-gradient(circle, rgba(60,60,60, 0.3), rgba(0, 0, 0, 0))'
  // }
  //
  // const handleMouseLeave = () => {
  //   cardRef.current.style.backgroundImage = 'none'
  // }

  <div className={className} onClick={onClick && onClick}>
    {children}
  </div>
)
