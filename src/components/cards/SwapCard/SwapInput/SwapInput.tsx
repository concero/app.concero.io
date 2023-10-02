import { FC, useContext } from 'react'
import { createWalletClient, custom } from 'viem'
import { providers } from 'ethers'
import { useAccount, useSwitchNetwork } from 'wagmi'
import { TokenArea } from '../TokenArea/TokenArea'
import { SwapDetails } from '../SwapDetails/SwapDetails'
import classNames from './SwapInput.module.pcss'
import { SwapInputProps } from './types'
import { SwapButton } from '../../../buttons/SwapButton/SwapButton'
import { handleSwap } from '../swapExecution/handleSwap'
import { InsuranceCard } from '../InsuranceCard/InsuranceCard'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
// import { TextInput } from '../../../input/TextInput'

export const SwapInput: FC<SwapInputProps> = ({ swapState, swapDispatch }) => {
	const { address, isConnected } = useAccount()
	const { switchNetworkAsync } = useSwitchNetwork()
	const isInsuranceCardVisible = swapState.selectedRoute?.insurance
	const { getChains, getTokens } = useContext(DataContext)

	// const handleChangeToAddress = (value: string) => swapDispatch({ type: 'SET_TO_ADDRESS', payload: value })

	const switchChainHook = async (requiredChainId: number): Promise<providers.JsonRpcSigner> => {
		if (switchNetworkAsync && window.ethereum.chainId && requiredChainId && parseInt(window.ethereum.chainId) !== requiredChainId) {
			await switchNetworkAsync(requiredChainId)
		}
		const client0 = createWalletClient({
			transport: custom(window.ethereum),
		})
		const provider = new providers.Web3Provider(client0.transport, 'any')
		return provider.getSigner()
	}

	return (
		<div className={classNames.container}>
			<TokenArea direction="from" selection={swapState.from} swapDispatch={swapDispatch} balance={swapState.balance} chains={swapState.chains} />
			<TokenArea direction="to" selection={swapState.to} swapDispatch={swapDispatch} chains={swapState.chains} />
			{/* {destinationAddressRequired ? ( */}
			{/*   <TextInput */}
			{/*     placeholder={'Enter destination address'} */}
			{/*     title={'Destination address'} */}
			{/*     value={swapState.to.address} */}
			{/*     onChangeText={handleChangeToAddress} */}
			{/*     isDisabled={swapState.routes.length} */}
			{/*   /> */}
			{/* ) : null} */}
			{isInsuranceCardVisible ? <InsuranceCard swapState={swapState} swapDispatch={swapDispatch} /> : null}
			<SwapDetails swapState={swapState} setSelectedRoute={route => swapDispatch({ type: 'SET_SELECTED_ROUTE', payload: route })} />
			<SwapButton swapState={swapState} isConnected={isConnected} onClick={() => handleSwap({ swapState, swapDispatch, address, switchChainHook })} />
		</div>
	)
}
