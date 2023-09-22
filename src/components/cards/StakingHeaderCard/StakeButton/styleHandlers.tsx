import { IconArrowsUpDown, IconCornerDownRight, IconWallet } from '@tabler/icons-react'
import { Status } from '../ManageModal/constants'

export const buttonIcons = {
  [Status.swap]: <IconCornerDownRight size={18} />,
  [Status.input]: '',
  [Status.balanceError]: <IconWallet size={18} />,
  [Status.success]: <IconArrowsUpDown size={18} />,
}

export function buttonClassNames(status) {
  switch (status) {
    case Status.input || Status.loading || Status.noRoute:
      return 'disabled'
    case Status.swap:
      return ''
    case Status.balanceError:
      return 'wrong'
    case Status.unknownError:
      return 'wrong'
    case Status.success:
      return 'success'
    default:
      return 'disabled'
  }
}
