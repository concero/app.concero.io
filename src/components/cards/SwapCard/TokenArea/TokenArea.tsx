import { FC, useEffect, useRef, useState } from 'react'
import { getTokenBalance } from '@lifi/sdk/dist/balance'
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
import { ChainColumns } from './chainColumns'
import { TokenColumns } from './tokenColumns'
import { isFloatInput } from '../../../../utils/validation'
import { fetchCurrentTokenPriceUSD } from '../../../../api/lifi/fetchCurrentTokenPriceUSD'

export const TokenArea: FC<TokenAreaProps> = ({ direction, selection, dispatch, address }) => {
  const [showChainsModal, setShowChainsModal] = useState<boolean>(false)
  const [showTokensModal, setShowTokensModal] = useState<boolean>(false)
  const [currentTokenPriceUSD, setCurrentTokenPriceUSD] = useState<number>(0)
  const [mappedTokens, setMappedTokens] = useState<any[]>(tokens[selection.chain.id].slice(0, 50))
  const [balance, setBalance] = useState<string>(`0 ${selection.token.symbol}`)
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
      payload: {
        name: chain.name,
        symbol: chain.symbol,
        id: chain.id,
        logoURI: chain.logoURI,
      },
    })
  }
  // todo do not destructure

  const setToken = (token) => {
    console.log(token)
    dispatch({
      type: 'SET_TOKEN',
      direction,
      payload: {
        name: token.name,
        symbol: token.symbol,
        logoURI: token.logoURI,
        address: token.address,
      },
    })
  }

  const getCurrentPriceToken = async () => {
    const response = await fetchCurrentTokenPriceUSD(selection.chain.id, selection.token.symbol)
    setCurrentTokenPriceUSD(response)
  }

  const handleAmountChange = (input) => {
    if (input === '') return dispatch({ type: 'RESET_AMOUNTS', direction })
    if (!isFloatInput(input)) return

    dispatch({
      type: 'SET_AMOUNT',
      direction,
      payload: { amount: input },
    })

    dispatch({
      type: 'SET_AMOUNT',
      direction,
      payload: { amount_usd: (currentTokenPriceUSD * parseFloat(input)).toFixed(2).toString() },
    })
  }

  const getTokenBySymbol = (chainId, symbol) => tokens[chainId].find((token) => token.symbol === symbol)

  const fetchBalance = async () => {
    const response = await getTokenBalance(address, getTokenBySymbol(selection.chain.id, selection.token.symbol))
    if (!response) return
    const result = `${numberToFormatString(Number(response?.amount))} ${response?.symbol}`
    setBalance(result)
  }

  useEffect(() => {
    getCurrentPriceToken()
    fetchBalance()
    setMappedTokens(tokens[selection.chain.id].slice(0, 50))
  }, [selection.chain, selection.token])

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
          <p>{`Max: ${balance}`}</p>
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
            <h5>${selection.amount_usd}</h5>
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
        visibleData={mappedTokens}
        data={tokens[selection.chain.id]}
        columns={TokenColumns}
        show={showTokensModal}
        setShow={setShowTokensModal}
        onSelect={(token) => setToken(token)}
        onEndReached={() => handleMappedTokens()}
      />
    </>
  )
}
