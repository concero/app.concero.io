import { FC } from 'react'
import { Button } from '../../buttons/Button/Button'
import { colors } from '../../../constants/colors'

interface DotsIconButtonProps {
  onCLick: () => void
}

export const DotsIconButton: FC<DotsIconButtonProps> = ({ onCLick }) => {
  return (
    <Button
      onClick={onCLick}
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
