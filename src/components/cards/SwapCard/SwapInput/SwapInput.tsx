import { FC } from 'react'
import { createWalletClient, custom } from 'viem'
import { providers } from 'ethers'
import { useAccount, useSwitchNetwork } from 'wagmi'
import { TokenArea } from '../TokenArea/TokenArea'
import { SwapDetails } from '../SwapDetails/SwapDetails'
import classNames from './SwapInput.module.pcss'
import { SwapInputProps } from './types'
import { SwapButton } from '../../../buttons/SwapButton/SwapButton'
import { handleSwap } from '../swapExecution/handleSwap'
import { TextInput } from '../../../input/TextInput'

export const SwapInput: FC<SwapInputProps> = ({ swapState, swapDispatch }) => {
  const { address, isConnected } = useAccount()
  const { switchNetworkAsync } = useSwitchNetwork()

  const switchChainFunction = async (requiredChainId) => {
    if (switchNetworkAsync) await switchNetworkAsync(requiredChainId)

    const client0 = createWalletClient({
      transport: custom(window.ethereum),
    })

    const provider = new providers.Web3Provider(client0.transport, 'any')
    return provider.getSigner()
  }

  const switchChainHook = async (requiredChainId): Promise<providers.JsonRpcSigner> => {
    if (!window.ethereum.chainId || !requiredChainId || parseInt(window.ethereum.chainId) === parseInt(requiredChainId)) return
    return await switchChainFunction(requiredChainId)
  }

  const handleChangeToAddress = (value: string) => swapDispatch({ type: 'SET_TO_ADDRESS', payload: value })

  return (
    <div className={classNames.container}>
      <TokenArea direction="from" selection={swapState.from} swapDispatch={swapDispatch} balance={swapState.balance} />
      <TokenArea direction="to" selection={swapState.to} swapDispatch={swapDispatch} />
      <TextInput
        placeholder={'Enter destination address'}
        title={'Destination address'}
        value={swapState.to.address}
        onChangeText={handleChangeToAddress}
        isDisabled={swapState.routes.length}
      />
      <SwapDetails swapState={swapState} setSelectedRoute={(route) => swapDispatch({ type: 'SET_SELECTED_ROUTE', payload: route })} />
      <SwapButton swapState={swapState} isConnected={isConnected} onClick={() => handleSwap({ swapState, swapDispatch, address, switchChainHook })} />
    </div>
  )
}
