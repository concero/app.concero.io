import { Button } from '@concero/ui-kit'
import UserIcon from '@/shared/assets/icons/monochrome/User.svg?react'
import TrailRightIcon from '@/shared/assets/icons/monochrome/TrailArrowRight.svg?react'
import { ContactSupportModal } from '../ContactSupportModal/ContactSupportModal'
import { useState } from 'react'
import cls from './ContactSupportButton.module.pcss'
import { createPortal } from 'react-dom'
export const ContactSupportButton = () => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<>
			<Button
				variant="tetrary"
				size="m"
				leftIcon={<UserIcon />}
				trailIcon={{
					show: true,
					icon: <TrailRightIcon />,
				}}
				onClick={() => setIsOpen(true)}
				className={cls.btn}
			>
				Contact support
			</Button>
			{createPortal(<ContactSupportModal isShow={isOpen} setIsShow={setIsOpen} />, document.body)}
		</>
	)
}
