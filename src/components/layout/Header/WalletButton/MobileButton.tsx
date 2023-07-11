import { JSX } from 'react/jsx-runtime'
import { useAccount } from 'wagmi'
import { useMatch } from 'react-router-dom'
import { routes } from '../../../../constants/routes'
import { MobileBurgerMenu } from '../MobileBurgerMenu/MobileBurgerMenu'
import { BaseButton } from './BaseButton'
import IntrinsicAttributes = JSX.IntrinsicAttributes

interface MobileButtonProps {
  open: IntrinsicAttributes & ((options?: any) => Promise<void>)
  toggleTheme: () => void
}

export const MobileButton: FC<MobileButtonProps> = ({ open, toggleTheme }) => {
  const matchExchange = useMatch(routes.exchange)
  const matchPortfolio = useMatch(routes.portfolio)
  const { isConnected } = useAccount()

  return (
    <div style={{ alignItems: 'center' }}>
      <BaseButton onClick={open} isConnected={isConnected} />
      <MobileBurgerMenu matchPortfolio={matchPortfolio} matchExchange={matchExchange} toggleTheme={toggleTheme} />
    </div>
  )
}
