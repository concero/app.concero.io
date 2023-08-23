import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'
import { MenuPopover } from '../../../overlays/MenuPopover/MenuPopover'
import classNames from './HeaderPopoverMenu.module.pcss'

export function HeaderPopoverMenu() {
  const { address, isConnecting } = useAccount()

  const items = [
    {
      title: 'Copy address',
      iconName: 'Copy',
      danger: false,
      onClick: () => {
        navigator.clipboard.writeText(address)
      },
    },
    {
      title: 'Log out',
      iconName: 'Logout',
      danger: true,
      onClick: async () => {
        await disconnect()
      },
    },
  ]

  return (
    <div className={classNames.container}>
      <MenuPopover items={items} />
    </div>
  )
}
