import { type FC, useContext } from 'react'
import { useAccount, useSwitchNetwork, useWalletClient } from 'wagmi'
import { TokenArea } from '../TokenArea/TokenArea'
import { SwapDetails } from '../SwapDetails/SwapDetails'
import classNames from './SwapInput.module.pcss'
import { type SwapInputProps } from './types'
import { SwapButton } from '../../../buttons/SwapButton/SwapButton'
import { InsuranceCard } from '../InsuranceCard/InsuranceCard'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { type DataContextValue } from '../../../../hooks/DataContext/types'
import { getEthersSigner } from '../../../../web3/ethers'
import { type providers } from 'ethers'
import { IconArrowsUpDown } from '@tabler/icons-react'
import { DestinationAddressInput } from './DestinationAddressInput/DestinationAddressInput'
import { handleSwap } from '../swapExecution/handleSwap'
import { SwapCardStage } from '../swapReducer/types'

export const SwapInput: FC<SwapInputProps> = ({ swapState, swapDispatch }) => {
	const { getChainByProviderSymbol } = useContext<DataContextValue>(DataContext)
	const { address, isConnected } = useAccount()
	const isInsuranceCardVisible =
		swapState.selectedRoute?.insurance?.state === 'INSURABLE' || swapState.selectedRoute?.insurance?.state === 'INSURED'
	const walletClient = useWalletClient()
	const { switchNetworkAsync } = useSwitchNetwork()

	async function switchChainHook(requiredChainId: number): Promise<providers.JsonRpcSigner> {
		const currentChainId = walletClient.data?.chain.id
		if (currentChainId !== requiredChainId) {
			if (switchNetworkAsync) {
				const chain = await switchNetworkAsync(requiredChainId)
				if (!chain) throw new Error('Failed to switch to the required network')
				return (await getEthersSigner(chain.id)) as providers.JsonRpcSigner
			} else {
				throw new Error('Failed to switch to the required network')
			}
		}
		return (await getEthersSigner(requiredChainId)) as providers.JsonRpcSigner
	}

	async function getSigner(): Promise<providers.JsonRpcSigner> {
		const currentChainId = walletClient.data?.chain.id
		if (currentChainId) {
			return (await getEthersSigner(currentChainId)) as providers.JsonRpcSigner
		} else {
			throw new Error('Failed to get signer')
		}
	}

	const handleSwapButtonClick = async () => {
		if (swapState.stage === 'input') {
			swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.review })
		} else {
			await handleSwap({ swapState, swapDispatch, address, switchChainHook, getChainByProviderSymbol, getSigner })
		}
	}

	return (
		<div className={classNames.container}>
			<div className={classNames.tokenAreasContainer}>
				<TokenArea direction="from" selection={swapState.from} swapDispatch={swapDispatch} balance={swapState.balance} />
				<TokenArea direction="to" selection={swapState.to} swapDispatch={swapDispatch} isLoading={swapState.isLoading} />
				<div
					className={classNames.arrowsIcon}
					onClick={() => {
						swapDispatch({ type: 'SWAP_DIRECTIONS' })
					}}
				>
					<IconArrowsUpDown size={18} />
				</div>
			</div>
			{isInsuranceCardVisible ? <InsuranceCard swapState={swapState} swapDispatch={swapDispatch} /> : null}
			<SwapDetails swapState={swapState} swapDispatch={swapDispatch} />
			{swapState.isDestinationAddressVisible ? (
				<DestinationAddressInput swapState={swapState} swapDispatch={swapDispatch} />
			) : null}
			<SwapButton swapState={swapState} isConnected={isConnected} onClick={handleSwapButtonClick} />
		</div>
	)
}
