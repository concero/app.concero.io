import { useRef, useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'

import { capitalize, numberToFormatString } from '../../../../../utils/formatting'
import { Button } from '../../../../buttons/Button/Button'
import { colors } from '../../../../../constants/colors'
import { CryptoSymbol } from '../../../../tags/CryptoSymbol/CryptoSymbol'
import { TextInput } from '../../../../input/TextInput'
import classNames from './SelectArea.module.pcss'
import { ModalType } from '../constants'
import { isFloatInput } from '../../../../../utils/validation'

export function SelectArea({ selection, direction, dispatch, balance = null }) {
  const inputRef = useRef()
  const [isFocused, setIsFocused] = useState(false)

  function handleChangeText(value) {
    if (value && !isFloatInput(value)) return
    dispatch({ type: 'SET_AMOUNT', payload: value, direction })
  }

  function handleChainButtonClick() {
    dispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.chains })
    dispatch({ type: 'SET_DIRECTION', payload: direction })
  }

  return (
    <div className={`${classNames.tokenContainer} ${isFocused ? classNames.inputFocused : ''}`}>
      <div className={classNames.tokenRow}>
        <div className={classNames.tokenRowHeader}>
          <p>{capitalize(direction)}</p>
          <Button onClick={handleChainButtonClick} size="sm" variant="black" rightIcon={<IconChevronDown size={16} color={colors.text.secondary} />}>
            <CryptoSymbol src={selection.chain.logoURI} symbol={selection.chain.name} />
          </Button>
        </div>
        {balance !== null ? <p>{`Max: ${balance}`}</p> : null}
      </div>
      <div className={classNames.tokenRow}>
        <div>
          <TextInput
            ref={inputRef}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            variant="inline"
            placeholder={`0.0 ${selection.token.symbol}`}
            value={selection.amount}
            onChangeText={handleChangeText}
            isDisabled={direction === 'to'}
          />
          <h5>{`$${numberToFormatString(Number(selection.amount_usd), 2)}`}</h5>
        </div>
        <Button
          onClick={() => dispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.tokens })}
          size="sm"
          variant="black"
          rightIcon={<IconChevronDown size={16} color={colors.text.secondary} />}
        >
          <CryptoSymbol src={selection.token.logoURI} symbol={selection.token.symbol} />
        </Button>
      </div>
    </div>
  )
}
