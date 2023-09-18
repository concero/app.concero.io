import { useRef } from 'react'
import { IconChevronDown } from '@tabler/icons-react'

import { capitalize, numberToFormatString } from '../../../../../utils/formatting'
import { Button } from '../../../../buttons/Button/Button'
import { colors } from '../../../../../constants/colors'
import { CryptoSymbol } from '../../../../tags/CryptoSymbol/CryptoSymbol'
import { TextInput } from '../../../../input/TextInput'
import classNames from './SelectArea.module.pcss'
import { ModalType } from '../constants'

export function SelectArea({ selection, direction, dispatch, balance = null }) {
  const inputRef = useRef()

  function handleChangeText(value) {}

  return (
    <div className={`${classNames.tokenContainer}`}>
      <div className={classNames.tokenRow}>
        <div className={classNames.tokenRowHeader}>
          <p>{capitalize(direction)}</p>
          <Button
            onClick={() => dispatch({ type: 'SET_MODAL_TYPE', payload: ModalType.chains })}
            size="sm"
            variant="black"
            rightIcon={<IconChevronDown size={16} color={colors.text.secondary} />}
          >
            <CryptoSymbol src={selection.chain.logoURI} symbol={selection.chain.name} />
          </Button>
        </div>
        {balance !== null ? <p>{`Max: ${balance}`}</p> : null}
      </div>
      <div className={classNames.tokenRow}>
        <div>
          <TextInput
            ref={inputRef}
            onFocus={() => dispatch({ type: 'SET_IS_FOCUSED', payload: true })}
            onBlur={() => dispatch({ type: 'SET_IS_FOCUSED', payload: false })}
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
