import { FC, useContext } from 'react'
import { useAccount } from 'wagmi'
import { ThemeContext } from '../../../../hooks/themeContext'
import { truncateWallet } from '../../../../utils/formatting'
import { Button } from '../../../buttons/Button/Button'

interface BaseButtonProps {
  onClick?: () => void
}

export const BaseButton: FC<BaseButtonProps> = ({ onClick }) => {
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
