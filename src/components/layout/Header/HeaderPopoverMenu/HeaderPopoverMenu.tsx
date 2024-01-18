import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'
import { IconCopy, IconLogout } from '@tabler/icons-react'
import { MenuPopover } from '../../../overlays/MenuPopover/MenuPopover'
import classNames from './HeaderPopoverMenu.module.pcss'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'

export function HeaderPopoverMenu() {
	const { address } = useAccount()
	const { t } = useTranslation()

	const items = [
		{
			title: t('header.copyAddress'),
			icon: <IconCopy size={18} color="var(--color-text-secondary)" />,
			onClick: () => {
				navigator.clipboard.writeText(address)
				trackEvent({
					category: category.Wallet,
					action: action.CopyAddressToClipboard,
					label: 'Address copied to clipboard',
				})
			},
		},
		{
			title: t('header.logOut'),
			icon: <IconLogout size={18} color="var(--color-text-secondary)" />,
			onClick: async () => {
				disconnect()
				trackEvent({ category: category.Wallet, action: action.DisconnectWallet, label: 'Disconnect Wallet' })
			},
		},
	]

	return (
		<div className={classNames.container}>
			<MenuPopover items={items} />
		</div>
	)
}
