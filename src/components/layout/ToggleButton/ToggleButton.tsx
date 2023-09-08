import Toggle from 'react-styled-toggle'
import { FC, useContext } from 'react'
import { ThemeContext } from '../../../hooks/themeContext'

interface ToggleButtonProps {
  value: string
  onChange: () => void
}

export const ToggleButton: FC<ToggleButtonProps> = ({ value, onChange }) => {
  const { colors } = useContext(ThemeContext)

  return (
    <div>
      <Toggle
        height={26}
        width={54}
        sliderHeight={20}
        sliderWidth={20}
        backgroundColorChecked={colors.green.main}
        backgroundColorUnchecked={colors.grey.dark}
        checked={value}
        onChange={onChange}
      />
    </div>
  )
}
