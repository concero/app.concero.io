import { IconSettings } from '@tabler/icons-react'
import { Button } from '../../../buttons/Button/Button'

export function TooltipContent() {
	return (
		<Button variant="subtle" size="lg" leftIcon={<IconSettings size={18} color={'var(--color-text-secondary)'} />}>
			Coming Soon
		</Button>
	)
}
