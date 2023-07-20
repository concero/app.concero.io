import { FC } from 'react'
import * as Icons from 'tabler-icons-react'
import Icon from '../Icon'
import { colors } from '../../constants/colors'
import classNames from './TextInput.module.pcss'

export interface TextInputProps {
  value?: string
  placeholder: string
  onChangeText?: (value: string) => void
  iconName?: keyof typeof Icons
  variant?: 'default' | 'inline'
  isDisabled?: boolean
}

export const TextInput: FC<TextInputProps> = ({
  value,
  placeholder,
  onChangeText = null,
  iconName,
  variant,
  isDisabled = false,
  ...rest
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeText && onChangeText(event.target.value)
  }

  const inputClass = variant === 'inline' ? `${classNames.inputWrapper} ${classNames.inline}` : classNames.inputWrapper

  return (
    <div className={inputClass}>
      {iconName && <Icon name={iconName} className={classNames.inputIcon} size={18} color={colors.grey.dark} />}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={isDisabled}
        {...rest}
      />
    </div>
  )
}
