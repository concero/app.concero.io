import { useWeb3Modal } from '@web3modal/react'
import { FC, useContext } from 'react'
import { WithPopover } from '../../../wrappers/WithPopover'
import { HeaderPopoverMenu } from '../HeaderPopoverMenu/HeaderPopoverMenu'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { ThemeContext } from '../../../../hooks/themeContext'
import { MobileButton } from './MobileButton/MobileButton'
import { BaseButton } from './BaseButton/BaseButton'
import { DesktopButton } from './DesktopButton/DesktopButton'
import { useTracking } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'

interface WalletButtonProps {}

export const WalletButton: FC<WalletButtonProps> = () => {
	const isMobile = useMediaQuery('mobile')
	const { theme, toggleTheme } = useContext(ThemeContext)
	const { open } = useWeb3Modal()
	const { trackEvent } = useTracking()

	function handleClick() {
		open()
		trackEvent({ category: category.Wallet, action: action.ConnectWallet, label: 'Connect' })
	}

	const ButtonWithPopover = WithPopover(BaseButton, HeaderPopoverMenu)

	return (
		<div>
			{isMobile ? (
				<MobileButton onClick={handleClick} toggleTheme={toggleTheme} />
			) : (
				<div>
					<DesktopButton onClick={handleClick} ButtonWithPopover={ButtonWithPopover} toggleTheme={toggleTheme} theme={theme} />
				</div>
			)}
		</div>
	)
}
