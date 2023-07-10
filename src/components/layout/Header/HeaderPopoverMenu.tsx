import { disconnect } from '@wagmi/core'
import { useAccount, WagmiConfig } from 'wagmi'
import { MenuPopover } from '../../overlays/MenuPopover/MenuPopover'
import { wagmiConfig } from '../../../web3/rainbowKit'

export function HeaderPopoverMenu() {
  const { address } = useAccount()

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
      onClick: () => {
        disconnect()
      },
    },
  ]

  return (
    <WagmiConfig config={wagmiConfig}>
      <div>
        <MenuPopover items={items} />
      </div>
    </WagmiConfig>
  )
}
