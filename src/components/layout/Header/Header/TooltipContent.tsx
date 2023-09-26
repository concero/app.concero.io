import { IconSettings } from '@tabler/icons-react'
import { Button } from '../../../buttons/Button/Button'
import { colors } from '../../../../constants/colors'

export function TooltipContent() {
	return (
		<Button variant="subtle" size="lg" leftIcon={<IconSettings size={18} color={colors.text.secondary} />}>
			Coming Soon
		</Button>
	)
}
