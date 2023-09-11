import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'
import { Copy, Logout } from 'tabler-icons-react'
import { MenuPopover } from '../../../overlays/MenuPopover/MenuPopover'
import classNames from './HeaderPopoverMenu.module.pcss'

export function HeaderPopoverMenu() {
  const { address } = useAccount()

  const items = [
    {
      title: 'Copy address',
      icon: <Copy size={18} color="var(--color-text-secondary)" />,
      onClick: () => navigator.clipboard.writeText(address),
    },
    {
      title: 'Log out',
      iconName: <Logout size={18} color="var(--color-text-secondary)" />,
      onClick: async () => disconnect(),
    },
  ]

  return (
    <div className={classNames.container}>
      <MenuPopover items={items} />
    </div>
  )
}
