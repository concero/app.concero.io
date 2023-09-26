import { useWeb3Modal } from '@web3modal/react'
import { FC, useContext } from 'react'
import { WithPopover } from '../../../wrappers/WithPopover'
import { HeaderPopoverMenu } from '../HeaderPopoverMenu/HeaderPopoverMenu'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { ThemeContext } from '../../../../hooks/themeContext'
import { MobileButton } from './MobileButton/MobileButton'
import { BaseButton } from './BaseButton/BaseButton'
import { DesktopButton } from './DesktopButton/DesktopButton'

interface WalletButtonProps {}

export const WalletButton: FC<WalletButtonProps> = () => {
	const isDesktop = useMediaQuery('mobile')
	const { theme, toggleTheme } = useContext(ThemeContext)
	const { open } = useWeb3Modal()
	const ButtonWithPopover = WithPopover(BaseButton, HeaderPopoverMenu, 'hover')

	return (
		<div>
			{isDesktop ? (
				<div>
					<DesktopButton open={open} ButtonWithPopover={ButtonWithPopover} toggleTheme={toggleTheme} theme={theme} />
				</div>
			) : (
				<MobileButton open={open} toggleTheme={toggleTheme} />
			)}
		</div>
	)
}
