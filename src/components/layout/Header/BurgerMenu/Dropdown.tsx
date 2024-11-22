import { type ReactNode, useState } from 'react'
import { TrailArrowDownIcon } from '../../../../assets/icons/TrailArrowDownIcon'
import { TrailArrowUpIcon } from '../../../../assets/icons/TrailArrowUpIcon'
import { Button } from '../../../buttons/Button/Button'
import classNames from './BurgerMenu.module.pcss'

interface Props {
	children: ReactNode
}

export const Dropdown = ({ children }: Props) => {
	const [open, setOpen] = useState(false)

	const toggleOpen = () => {
		setOpen(!open)
	}

	return (
		<div>
			<Button
				variant="tetrary"
				size="md"
				isFull
				rightIcon={open ? <TrailArrowUpIcon /> : <TrailArrowDownIcon />}
				onClick={toggleOpen}
				className={classNames.dropdownButton}
			>
				Settings
			</Button>
			{open && <div>{children}</div>}
		</div>
	)
}
