import Lottie from 'lottie-react'
import loadingAnimation from '../../../assets/animations/circle-loading.json'

export function LoadingAnimation() {
  return (
    <Lottie
      loop
      autoplay
      animationData={loadingAnimation}
      style={{
        width: 30,
        height: 30,
      }}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice',
      }}
    />
  )
}
