import { FC, useEffect, useRef, useState } from 'react'
import classNames from '../SwapCard.module.pcss'
import { Button } from '../../../buttons/Button/Button'
import { EntityListModal } from '../../../modals/EntityListModal/EntityListModal'
import { capitalize, numberToFormatString } from '../../../../utils/formatting'
import { CryptoSymbol } from '../../../tags/CryptoSymbol/CryptoSymbol'
import { colors } from '../../../../constants/colors'
import { TextInput } from '../../../input/TextInput'
import { chains } from '../../../../constants/chains'
import { tokens } from '../../../../constants/tokens'
import { TokenAreaProps } from './types'
import { ChainColumns } from './ChainColumns'
import { TokenColumns } from './TokenColumns'
import { isFloatInput } from '../../../../utils/validation'
import { fetchCurrentTokenPriceUSD } from '../../../../api/coinGecko/fetchCurrentTokenPriceUSD'

export const TokenArea: FC<TokenAreaProps> = ({ direction, selection, dispatch, balance = null }) => {
  const [showChainsModal, setShowChainsModal] = useState<boolean>(false)
  const [showTokensModal, setShowTokensModal] = useState<boolean>(false)
  const [currentTokenPriceUSD, setCurrentTokenPriceUSD] = useState<number>(0)
  const [mappedTokens, setMappedTokens] = useState<any[]>(tokens[selection.chain.id].slice(0, 50))
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const inputRef = useRef()

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const setChain = (chain) => {
    dispatch({
      type: 'SET_CHAIN',
      direction,
      payload: { chain },
    })
  }

  const setToken = (token) => {
    dispatch({
      type: 'SET_TOKEN',
      direction,
      payload: { token },
    })
  }

  const setAmountUsd = (input) => {
    dispatch({
      type: 'SET_AMOUNT',
      direction,
      payload: {
        amount_usd: (currentTokenPriceUSD * parseFloat(input)).toFixed(2).toString(),
      },
    })
  }

  const getCurrentPriceToken = async () => {
    const response = await fetchCurrentTokenPriceUSD(selection.token.symbol)
    setCurrentTokenPriceUSD(response)
  }

  const handleAmountChange = (input) => {
    if (input === '') {
      return dispatch({
        type: 'RESET_AMOUNTS',
        direction,
      })
    }
    if (!isFloatInput(input)) return

    dispatch({
      type: 'SET_AMOUNT',
      direction,
      payload: { amount: input },
    })

    setAmountUsd(input)
  }

  useEffect(() => {
    if (direction === 'from') getCurrentPriceToken()
    setMappedTokens(tokens[selection.chain.id].slice(0, 50))
  }, [selection.chain, selection.token])

  useEffect(() => {
    if (selection.amount) setAmountUsd(selection.amount)
  }, [currentTokenPriceUSD])

  const handleMappedTokens = () => {
    setMappedTokens([
      ...mappedTokens,
      ...tokens[selection.chain.id].slice(mappedTokens.length, mappedTokens.length + 50),
    ])
  }

  return (
    <>
      <div
        className={`${classNames.tokenContainer} ${isFocused ? classNames.inputFocused : ''}`}
        onClick={() => handleClick()}
      >
        <div className={classNames.tokenRow}>
          <div className={classNames.tokenRowHeader}>
            <p>{capitalize(direction)}</p>
            <Button
              onClick={() => setShowChainsModal(true)}
              size="sm"
              variant="black"
              rightIcon={{
                name: 'ChevronDown',
                iconProps: {
                  size: 18,
                  color: colors.text.secondary,
                },
              }}
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
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              variant="inline"
              placeholder={`0.0 ${selection.token.symbol}`}
              value={selection.amount}
              onChangeText={(value) => direction === 'from' && handleAmountChange(value)}
              isDisabled={direction === 'to'}
            />
            <h5>${numberToFormatString(Number(selection.amount_usd), 2)}</h5>
          </div>
          <Button
            onClick={() => setShowTokensModal(true)}
            size="sm"
            variant="black"
            rightIcon={{
              name: 'ChevronDown',
              iconProps: {
                size: 18,
                color: colors.text.secondary,
              },
            }}
          >
            <CryptoSymbol src={selection.token.logoURI} symbol={selection.token.symbol} />
          </Button>
        </div>
      </div>
      <EntityListModal
        title="Select chain"
        data={chains}
        columns={ChainColumns}
        show={showChainsModal}
        setShow={setShowChainsModal}
        onSelect={(chain) => setChain(chain)}
      />
      <EntityListModal
        title="Select token"
        data={tokens[selection.chain.id]}
        visibleData={mappedTokens}
        columns={TokenColumns}
        show={showTokensModal}
        setShow={setShowTokensModal}
        onSelect={(token) => setToken(token)}
        onEndReached={() => handleMappedTokens()}
        animate={false}
      />
    </>
  )
}
