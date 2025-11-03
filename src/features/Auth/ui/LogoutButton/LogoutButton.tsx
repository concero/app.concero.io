import { Button } from '@concero/ui-kit'
import PowerIcon from '@/shared/assets/icons/monochrome/Power.svg?react'
import { useDisconnect } from 'wagmi'
import cls from './LogoutButton.module.pcss'
import { HStack } from '@/shared/ui/Stack'

export const LogoutButton = () => {
	const { disconnect } = useDisconnect()
	return (
		<Button as="div" variant="secondary" size="l" onClick={() => disconnect()} className={cls.btn}>
			<HStack gap="space_0_25" justify="center" className={cls.row}>
				<PowerIcon />
				Log Out
			</HStack>
		</Button>
	)
}
