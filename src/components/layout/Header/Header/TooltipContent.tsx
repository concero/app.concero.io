import { Button } from '../../../buttons/Button/Button'
import { colors } from '../../../../constants/colors'

export function TooltipContent() {
  return (
    <Button
      variant="subtle"
      size="lg"
      leftIcon={{
        name: 'Settings',
        iconProps: {
          color: colors.text.secondary,
          size: 18,
        },
      }}
    >
      Coming Soon
    </Button>
  )
}
