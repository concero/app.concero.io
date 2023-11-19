import { useWeb3Modal } from '@web3modal/react'
import { FC, useContext } from 'react'
import { WithPopover } from '../../../wrappers/WithPopover'
import { HeaderPopoverMenu } from '../HeaderPopoverMenu/HeaderPopoverMenu'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { ThemeContext } from '../../../../hooks/themeContext'
import { BaseButton } from './BaseButton/BaseButton'
import { useTracking } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'
import { useAccount } from 'wagmi'

interface WalletButtonProps {}

export const WalletButton: FC<WalletButtonProps> = () => {
	const isMobile = useMediaQuery('mobile')
	const { toggleTheme } = useContext(ThemeContext)
	const { open } = useWeb3Modal()
	const { trackEvent } = useTracking()
	const { isConnected } = useAccount()

	function handleClick() {
		open()
		trackEvent({ category: category.Wallet, action: action.ClickConnectWallet, label: 'Clicked Connect Wallet' })
	}

	const ButtonWithPopover = WithPopover(BaseButton, HeaderPopoverMenu)

	return <div>{isMobile ? <BaseButton onClick={handleClick} /> : <>{isConnected ? <ButtonWithPopover onClick={handleClick} /> : <BaseButton onClick={handleClick} />}</>}</div>
}
