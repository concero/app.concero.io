import { IconArrowsUpDown, IconCornerDownRight, IconWallet } from '@tabler/icons-react'
import { Status } from '../ManageModal/constants'

type ButtonIcons = Record<string, JSX.Element | string>

export const buttonIcons: ButtonIcons = {
	[Status.stake]: <IconCornerDownRight size={18} />,
	[Status.withdraw]: <IconCornerDownRight size={18} />,
	[Status.input]: '',
	[Status.balanceError]: <IconWallet size={18} />,
	[Status.success]: <IconArrowsUpDown size={18} />,
}

export function buttonClassNames(status: Status) {
	switch (status) {
		case Status.input || Status.loading || Status.noRoute:
			return 'disabled'
		case Status.stake:
			return ''
		case Status.withdraw:
			return ''
		case Status.balanceError:
			return 'wrong'
		case Status.unknownError:
			return 'wrong'
		case Status.success:
			return 'success'
		case Status.canceled:
			return 'wrong'
		default:
			return 'disabled'
	}
}
