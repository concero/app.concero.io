import Lottie from 'lottie-react'
import loadingAnimation from '../../../assets/animations/circle-loading.json'

interface LoadingAnimationProps {
  color?: 'primary' | 'secondary'
  size?: number
}

export function LoadingAnimation({ color = 'primary', size = 30 }) {
  return (
    <Lottie
      loop
      autoplay
      animationData={loadingAnimation}
      style={{
        width: size,
        height: size,
      }}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice',
      }}
    />
  )
}
