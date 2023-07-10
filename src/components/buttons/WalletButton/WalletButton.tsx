import { FC, useContext } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '../Button/Button'

import { truncateWallet } from '../../../utils/formatting'
import { ThemeContext } from '../../../hooks/themeContext'

interface WalletButtonProps {
  onClick?: () => void
}

export const WalletButton: FC<WalletButtonProps> = ({ onClick, variant }) => {
  const { address, isConnecting, isConnected, isDisconnected } = useAccount()
  const { colors } = useContext(ThemeContext)

  const getStatus = () => {
    if (isDisconnected) {
      return 'Connect Wallet'
    } else if (isConnected) {
      return truncateWallet(address)
    } else if (isConnecting) {
      return 'Connecting...'
    }
  }

  return (
    <Button
      variant={!isConnected ? 'filled' : 'subtle'}
      rightIcon={
        isConnected && variant !== 'mobile'
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
      size={'sm'}
      onClick={() => onClick && onClick()}
    >
      <p className={isConnected ? 'body1' : ''}>{getStatus()}</p>
    </Button>
  )
}
