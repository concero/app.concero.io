import { FC, useContext, useEffect, useRef } from 'react'
import { animated, useSpring } from 'react-spring'
import { ChevronDown } from 'tabler-icons-react'
import classNames from '../SwapCard.module.pcss'
import { Button } from '../../../buttons/Button/Button'
import { EntityListModal } from '../../../modals/EntityListModal/EntityListModal'
import { capitalize, numberToFormatString } from '../../../../utils/formatting'
import { CryptoSymbol } from '../../../tags/CryptoSymbol/CryptoSymbol'
import { colors } from '../../../../constants/colors'
import { TextInput } from '../../../input/TextInput'
import { TokenAreaProps } from './types'
import { ChainColumns } from './ChainColumns'
import { TokenColumns } from './TokenColumns'
import { handleAmountChange, handleAreaClick } from './handlers'
import { useTokenAreaReducer } from './tokenAreaReducer'
import { isFloatInput } from '../../../../utils/validation'
import { getCurrentPriceToken } from './getCurrentPriceToken'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { populateTokens } from './populateTokens'

export const TokenArea: FC<TokenAreaProps> = ({ direction, selection, swapDispatch, balance = null, chains }) => {
  const { getTokens } = useContext(DataContext)
  const [state, tokenAreaDispatch] = useTokenAreaReducer(direction, selection)
  const inputRef = useRef()

  const shakeProps = useSpring({
    from: { transform: 'translateX(0)' },
    to: [{ transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0px)' }],
    config: { duration: 50, mass: 1, tension: 500, friction: 10 },
    reset: false,
    onRest: () => state.shake && tokenAreaDispatch({ type: 'SET_SHAKE', payload: false }),
  })

  const onChangeText = (value) => {
    if (value && !isFloatInput(value)) tokenAreaDispatch({ type: 'SET_SHAKE', payload: true })
    if (direction === 'from') handleAmountChange({ value, state, dispatch: swapDispatch, direction })
  }

  const handleSelectChain = async (chain) => {
    const tokens = await getTokens(chain.id)
    swapDispatch({ type: 'SET_CHAIN', direction, payload: { chain }, tokens })
  }

  useEffect(() => {
    if (direction === 'from') getCurrentPriceToken(selection, tokenAreaDispatch)
  }, [selection.chain, selection.token])

  useEffect(() => {
    populateTokens({ getTokens, selection, tokenAreaDispatch })
  }, [selection.chain])

  useEffect(() => {
    if (selection.amount) handleAmountChange({ value: selection.amount, state, dispatch: swapDispatch, direction })
  }, [state.currentTokenPriceUSD])

  return (
    <>
      <animated.div
        className={`${classNames.tokenContainer} ${state.isFocused ? classNames.inputFocused : ''}`}
        onClick={() => handleAreaClick({ inputRef })}
        style={state.shake ? shakeProps : {}}
      >
        <div className={classNames.tokenRow}>
          <div className={classNames.tokenRowHeader}>
            <p>{capitalize(direction)}</p>
            <Button
              onClick={() => tokenAreaDispatch({ type: 'SET_SHOW_CHAINS_MODAL', payload: true })}
              size="sm"
              variant="black"
              rightIcon={<ChevronDown size={16} color={colors.text.secondary} />}
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
              onFocus={() => tokenAreaDispatch({ type: 'SET_IS_FOCUSED', payload: true })}
              onBlur={() => tokenAreaDispatch({ type: 'SET_IS_FOCUSED', payload: false })}
              variant="inline"
              placeholder={`0.0 ${selection.token.symbol}`}
              value={selection.amount}
              onChangeText={(value) => onChangeText(value)}
              isDisabled={direction === 'to'}
            />
            <h5>{`$${numberToFormatString(Number(selection.amount_usd), 2)}`}</h5>
          </div>
          <Button
            onClick={() => tokenAreaDispatch({ type: 'SET_SHOW_TOKENS_MODAL', payload: true })}
            size="sm"
            variant="black"
            rightIcon={<ChevronDown size={16} color={colors.text.secondary} />}
          >
            <CryptoSymbol src={selection.token.logoURI} symbol={selection.token.symbol} />
          </Button>
        </div>
      </animated.div>
      <EntityListModal
        title="Select chain"
        data={chains}
        columns={ChainColumns}
        show={state.showChainsModal}
        entitiesVisible={15}
        setShow={(value) => tokenAreaDispatch({ type: 'SET_SHOW_CHAINS_MODAL', payload: value })}
        onSelect={handleSelectChain}
      />
      <EntityListModal
        title="Select token"
        data={state.tokens}
        entitiesVisible={15}
        columns={TokenColumns}
        show={state.showTokensModal}
        setShow={(value) => tokenAreaDispatch({ type: 'SET_SHOW_TOKENS_MODAL', payload: value })}
        onSelect={(token) => swapDispatch({ type: 'SET_TOKEN', direction, payload: { token } })}
      />
    </>
  )
}
