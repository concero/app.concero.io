import { type FC, useContext } from 'react'
import { useAccount, useSwitchChain, useWalletClient } from 'wagmi'
import { TokenArea } from '../TokenArea/TokenArea'
import { SwapDetails } from '../SwapDetails/SwapDetails'
import classNames from './SwapInput.module.pcss'
import { type SwapInputProps } from './types'
import { SwapButton } from '../../PoolCard/SwapButton/SwapButton'
import { InsuranceCard } from '../InsuranceCard/InsuranceCard'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { type DataContextValue } from '../../../../hooks/DataContext/types'
import { getEthersSigner } from '../../../../web3/ethers'
import { type providers } from 'ethers'
import { IconArrowsUpDown } from '@tabler/icons-react'
import { DestinationAddressInput } from './DestinationAddressInput/DestinationAddressInput'
import { SwapCardStage } from '../swapReducer/types'
import { executeConceroRoute } from '../swapExecution/executeConceroRoute'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'
import { handleSwap } from '../swapExecution/handleSwap'

export const SwapInput: FC<SwapInputProps> = ({ swapState, swapDispatch, isNewSwapCardMode, setTxInfo }) => {
	const { getChainByProviderSymbol } = useContext<DataContextValue>(DataContext)
	const { address, isConnected } = useAccount()
	const isInsuranceCardVisible =
		swapState.selectedRoute?.insurance?.state === 'INSURABLE' ||
		swapState.selectedRoute?.insurance?.state === 'INSURED'
	const walletClient = useWalletClient()
	const { switchChainAsync } = useSwitchChain()

	async function switchChainHook(requiredChainId: number) {
		if (!walletClient.data) {
			throw new Error('Wallet client data is not available')
		}

		const currentChainId = walletClient.data.chain.id

		if (currentChainId !== requiredChainId) {
			if (switchChainAsync) {
				const chain = await switchChainAsync({ chainId: requiredChainId })
				if (!chain) throw new Error('Failed to switch to the required network')
			} else {
				throw new Error('switchNetworkAsync is not available')
			}
		}
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
		if (swapState.isTestnet) {
			void trackEvent({
				category: category.PoolCard,
				action: action.BeginSwap,
				label: 'concero_begin_swap',
				data: { isNewSwapCardMode, from: swapState.from, to: swapState.to },
			})
			const time = await executeConceroRoute(swapState, swapDispatch)
			setTxInfo(time)
		}

		if (swapState.stage === 'input') {
			swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.review })
		} else {
			await handleSwap({
				swapState,
				swapDispatch,
				address,
				switchChainHook,
				getChainByProviderSymbol,
				getSigner,
				isNewSwapCardMode,
			})
		}
	}

	return (
		<div className={classNames.container}>
			<div className={classNames.tokenAreasContainer}>
				<TokenArea
					direction="from"
					selection={swapState.from}
					swapDispatch={swapDispatch}
					balance={swapState.balance}
					stage={swapState.stage}
					isTestnet={swapState.isTestnet}
				/>
				<TokenArea
					direction="to"
					selection={swapState.to}
					swapDispatch={swapDispatch}
					isLoading={swapState.isLoading}
					stage={swapState.stage}
					isTestnet={swapState.isTestnet}
				/>
				{swapState.stage === SwapCardStage.input ? (
					<div
						className={classNames.arrowsIcon}
						onClick={() => {
							swapDispatch({ type: 'SWAP_DIRECTIONS' })
						}}
					>
						<IconArrowsUpDown size={18} />
					</div>
				) : null}
			</div>
			{isInsuranceCardVisible ? <InsuranceCard swapState={swapState} swapDispatch={swapDispatch} /> : null}
			<SwapDetails swapState={swapState} swapDispatch={swapDispatch} />
			{swapState.isDestinationAddressVisible ? (
				<DestinationAddressInput swapState={swapState} swapDispatch={swapDispatch} />
			) : null}
			<SwapButton
				swapState={swapState}
				isConnected={isConnected}
				onClick={handleSwapButtonClick}
				switchChainHook={switchChainHook}
			/>
		</div>
	)
}
