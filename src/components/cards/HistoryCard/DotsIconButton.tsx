import { type FC } from 'react'
import { IconDots } from '@tabler/icons-react'
import { Button } from '../../buttons/Button/Button'

interface DotsIconButtonProps {
	onCLick: () => void
}

export const DotsIconButton: FC<DotsIconButtonProps> = ({ onCLick }) => (
	<Button onClick={onCLick} variant="subtle" size="xs" leftIcon={<IconDots size={20} color={'var(--color-text-secondary)'} />} />
)
