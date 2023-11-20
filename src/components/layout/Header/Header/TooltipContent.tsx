import { IconSettings } from '@tabler/icons-react'
import { Button } from '../../../buttons/Button/Button'
import { useTranslation } from 'react-i18next'

export function TooltipContent() {
	const { t } = useTranslation()

	return (
		<Button variant="subtle" size="lg" leftIcon={<IconSettings size={18} color={'var(--color-text-secondary)'} />}>
			{t('header.comingSoon')}
		</Button>
	)
}
