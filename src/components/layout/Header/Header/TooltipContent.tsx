import { Settings } from 'tabler-icons-react'
import { Button } from '../../../buttons/Button/Button'
import { colors } from '../../../../constants/colors'

export function TooltipContent() {
  return (
    <Button variant="subtle" size="lg" leftIcon={<Settings size={18} color={colors.text.secondary} />}>
      Coming Soon
    </Button>
  )
}
