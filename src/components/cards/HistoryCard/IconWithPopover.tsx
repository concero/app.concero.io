import { Button } from '../../buttons/Button/Button'
import { colors } from '../../../constants/colors'

export const IconWithPopover = () => {
  return (
    <Button
      variant={'subtle'}
      size={'xs'}
      leftIcon={{
        name: 'Dots',
        iconProps: {
          size: 20,
          color: colors.text.secondary,
        },
      }}
    />
  )
}
