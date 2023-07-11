import { useMatch } from 'react-router-dom'
import { useWeb3Modal } from '@web3modal/react'
import { FC, useContext } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '../Button/Button'
import { truncateWallet } from '../../../utils/formatting'
import { WithPopover } from '../../wrappers/WithPopover'
import { HeaderPopoverMenu } from '../../layout/Header/HeaderPopoverMenu'
import { MobileBurgerMenu } from '../../layout/Header/MobileBurgerMenu'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { routes } from '../../../constants/routes'
import { ThemeContext } from '../../../hooks/themeContext'

interface WalletButtonProps {}

interface BaseButtonProps {
  onClick?: () => void
}

const BaseButton: FC<BaseButtonProps> = ({ onClick }) => {
  const { colors } = useContext(ThemeContext)
  const { address, isConnected, isDisconnected, isConnecting } = useAccount()

  const getStatus = () => {
    if (isConnected) return truncateWallet(address)
    if (isConnecting) return 'Connecting...'
    if (isDisconnected) return 'Connect Wallet'
    return 'Connect Wallet'
  }
  return (
    <Button
      variant={isConnected ? 'subtle' : 'filled'}
      rightIcon={
        isConnected
          ? {
              name: 'ChevronDown',
              iconProps: {
                color: colors.text.secondary,
                size: 18,
              },
            }
          : null
      }
      leftIcon={{
        name: 'Wallet',
        iconProps: {
          color: isConnected ? colors.text.secondary : colors.base.white,
          size: 18,
        },
      }}
      size="sm"
      onClick={() => onClick && onClick()}
    >
      <p className={isConnected ? 'body1' : ''}>{getStatus()}</p>
    </Button>
  )
}

export const WalletButton: FC<WalletButtonProps> = () => {
  const { isConnected } = useAccount()
  const isDesktop = useMediaQuery('mobile')
  const matchExchange = useMatch(routes.exchange)
  const matchPortfolio = useMatch(routes.portfolio)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { open } = useWeb3Modal()

  const ButtonWithPopover = WithPopover(BaseButton, HeaderPopoverMenu, 'hover')

  return (
    <div>
      {isDesktop ? (
        <div>
          {isConnected ? <ButtonWithPopover onClick={open} /> : <BaseButton onClick={open} />}
          <Button
            size="sq-md"
            onClick={toggleTheme}
            variant="black"
            leftIcon={{
              name: theme === 'light' ? 'Moon' : 'Sun',
              iconProps: { size: 18 },
            }}
          />
        </div>
      ) : (
        <div style={{ alignItems: 'center' }}>
          <BaseButton onClick={open} isConnected={isConnected} />
          <MobileBurgerMenu matchPortfolio={matchPortfolio} matchExchange={matchExchange} toggleTheme={toggleTheme} />
        </div>
      )}
    </div>
  )
}
