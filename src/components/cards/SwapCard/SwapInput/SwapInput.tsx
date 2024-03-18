import { type FC, useContext } from 'react'
import { useAccount, useSwitchChain } from 'wagmi'
import { TokenArea } from '../TokenArea/TokenArea'
import { SwapDetails } from '../SwapDetails/SwapDetails'
import classNames from './SwapInput.module.pcss'
import { type SwapInputProps } from './types'
import { SwapButton } from '../../../buttons/SwapButton/SwapButton'
import { InsuranceCard } from '../InsuranceCard/InsuranceCard'
import { DataContext } from '../../../../hooks/DataContext/DataContext'
import { type DataContextValue } from '../../../../hooks/DataContext/types'
import { getEthersSigner } from '../../../../web3/ethers'
import { type JsonRpcSigner } from 'ethers'
import { IconArrowsUpDown } from '@tabler/icons-react'
import { DestinationAddressInput } from './DestinationAddressInput/DestinationAddressInput'
import { SwapCardStage } from '../swapReducer/types'
import { walletClient } from '../../../../web3/wagmi'
import { arbitrumSepolia } from 'wagmi/chains'
import { ccipABI } from './ccipABI'

export const SwapInput: FC<SwapInputProps> = ({ swapState, swapDispatch }) => {
	const { getChainByProviderSymbol } = useContext<DataContextValue>(DataContext)
	const { address, isConnected, chainId } = useAccount()

	// todo: this is a bit of a mess
	const isInsuranceCardVisible =
		swapState.selectedRoute?.insurance?.state === 'INSURABLE' ||
		swapState.selectedRoute?.insurance?.state === 'INSURED'

	const { switchChainAsync } = useSwitchChain()

	async function sendMessage({ receiver, text, token, amount, feeTokenAddress }) {
		const abi = ['function buildCCIPMessage(address,string,address,uint256,address) returns (bytes memory)']

		const result = await walletClient.writeContract({
			chain: arbitrumSepolia,
			address: '0x720780b200847eF8E8026D12335813890b77deeE', // Contract address
			abi: ccipABI, // Contract ABI
			functionName: '_buildCCIPMessage', // Function name to call
			account: address,
			args: [receiver, text, token, amount, feeTokenAddress], // Arguments to pass to the function
		})
		console.log('result', result)
		return result // Contains the transaction details
	}

	// todo: why do we have a switchChainHook here? its a generic utility
	async function switchChainHook(requiredChainId: number): Promise<JsonRpcSigner> {
		const currentChainId = walletClient.data?.chain.id
		if (currentChainId !== requiredChainId) {
			if (switchChainAsync) {
				const chain = await switchChainAsync({ chainId: requiredChainId })
				if (!chain) throw new Error('Failed to switch to the required network')
				return (await getEthersSigner(chain.id))!
			} else {
				throw new Error('Failed to switch to the required network')
			}
		}
		return (await getEthersSigner(requiredChainId))!
	}

	async function getSigner(): Promise<JsonRpcSigner> {
		const currentChainId = walletClient.data?.chain.id
		if (currentChainId) {
			return (await getEthersSigner(currentChainId))!
		} else {
			throw new Error('Failed to get signer')
		}
	}

	const handleSwapButtonClick = async () => {
		sendMessage({
			receiver: '0x70E73f067a1fC9FE6D53151bd271715811746d3a',
			text: 'Hello, World',
			token: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d', // usdc
			amount: 1000000,
			feeTokenAddress: '0xb1D4538B4571d411F07960EF2838Ce337FE1E80E', // link
		})
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
				/>
				<TokenArea
					direction="to"
					selection={swapState.to}
					swapDispatch={swapDispatch}
					isLoading={swapState.isLoading}
					stage={swapState.stage}
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
			<SwapButton swapState={swapState} isConnected={isConnected} onClick={handleSwapButtonClick} />
		</div>
	)
}
