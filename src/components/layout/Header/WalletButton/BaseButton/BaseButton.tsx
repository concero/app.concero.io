import { FC, useContext } from 'react'
import { useAccount } from 'wagmi'
import { ChevronDown, Wallet } from 'tabler-icons-react'
import { ThemeContext } from '../../../../../hooks/themeContext'
import { truncateWallet } from '../../../../../utils/formatting'
import { Button } from '../../../../buttons/Button/Button'
import classNames from './BaseButton.module.pcss'

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
      variant={isConnected ? 'subtle' : 'primary'}
      rightIcon={isConnected ? <ChevronDown size={18} color={colors.text.secondary} /> : null}
      leftIcon={<Wallet size={18} color={isConnected ? colors.text.secondary : colors.white} />}
      size="sm"
      onClick={() => onClick && onClick()}
    >
      <p className={!isConnected ? classNames.buttonText : 'body1'}>{getStatus()}</p>
    </Button>
  )
}
