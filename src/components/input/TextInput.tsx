import React, { FC, ForwardedRef, forwardRef, useRef, useState } from 'react'
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
  title?: string
}

export const TextInput: FC<TextInputProps & { ref?: ForwardedRef<HTMLInputElement> }> = forwardRef<HTMLInputElement, TextInputProps>(
  ({ value, placeholder, onChangeText = null, iconName, variant, isDisabled = false, title = null, ...rest }, ref) => {
    const inputRef = useRef()
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const inputClass = variant === 'inline' && !title ? '' : classNames.inputWrapper
    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    const handleAreaClick = () => {
      if (inputRef.current) inputRef.current.focus()
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeText && onChangeText(event.target.value)
    }

    return (
      <div className={`${inputClass} ${isFocused ? classNames.focused : ''}`} onClick={handleAreaClick}>
        {title ? <p className={'body1'}>{title}</p> : null}
        <input
          ref={ref ?? inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={isDisabled}
          {...rest}
        />
        {iconName && <Icon name={iconName} className={classNames.inputIcon} size={18} color={colors.grey.dark} />}
      </div>
    )
  },
)
