import { MenuPopover } from '../../overlays/MenuPopover/MenuPopover'

const items = [
  {
    title: 'Copy address',
    iconName: 'Copy',
    danger: false,
    onClick: () => {
      console.log('Copy address')
    },
  },
  {
    title: 'Log out',
    iconName: 'Logout',
    danger: true,
    onClick: () => {
      console.log('Logout')
    },
  },
]

export const HeaderPopoverMenu = () => {
  return (
    <div>
      <MenuPopover items={items} />
    </div>
  )
}
