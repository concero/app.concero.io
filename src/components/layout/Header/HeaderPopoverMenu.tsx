import { useAccount } from 'wagmi'
import { disconnect } from '@wagmi/core'
import { MenuPopover } from '../../overlays/MenuPopover/MenuPopover'

export const HeaderPopoverMenu = () => {
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
    <div>
      <MenuPopover items={items} />
    </div>
  )
}
