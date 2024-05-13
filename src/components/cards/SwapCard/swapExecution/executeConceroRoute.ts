import { type SwapAction, SwapCardStage, type SwapState } from '../swapReducer/types'
import type { SwitchChainHookType } from '../SwapInput/types'
import { ethers, type providers } from 'ethers'
import { addingAmountDecimals } from '../../../../utils/formatting'
import ERC20 from '../../../../abi/ERC20.json'
import { linkAddressesMap } from '../../../buttons/SwapButton/linkAddressesMap'
import { type Dispatch } from 'react'
import { createPublicClient, decodeEventLog, http } from 'viem'
import { arbitrumSepolia, baseSepolia, optimismSepolia } from 'viem/chains'
import ConceroAbi from '../../../../abi/Concero.json'
import { trackEvent } from '../../../../hooks/useTracking'
import { action, category } from '../../../../constants/tracking'

const conceroAddressesMap: Record<string, string> = {
	'421614': '0x646e93db0b93f70A2feC79cf45dF6dF62b0331CF', // arb
	'11155420': '0x896F7Eccf939E5B79938228Cc2C5fE77D6363DDF', // opt
	'84532': '0x4E19030A8d7667712bdC6eB9814d10C159f09044', // base
}

const chainSelectorsMap: Record<string, string> = {
	'421614': '3478487238524512106',
	'11155420': '5224473277236331295',
	'84532': '10344971235874465080',
}
const viemChainsMap: Record<string, any> = {
	'84532': baseSepolia,
	'11155420': optimismSepolia,
	'421614': arbitrumSepolia,
}

const sleep = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms))

async function checkAllowanceAndApprove(swapState: SwapState, signer: providers.JsonRpcSigner) {
	const bnmContract = new ethers.Contract(swapState.from.token.address, ERC20, signer)
	const linkContract = new ethers.Contract(linkAddressesMap[swapState.from.chain.id], ERC20, signer)

	const [bnmAllowance, linkAllowance] = await Promise.all([
		bnmContract.allowance(signer._address, conceroAddressesMap[swapState.from.chain.id]),
		linkContract.allowance(signer._address, conceroAddressesMap[swapState.from.chain.id]),
	])

	let bnmApproveTx = null
	let linkApproveTx = null

	if (bnmAllowance < Number(addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals))) {
		bnmApproveTx = await bnmContract.approve(
			conceroAddressesMap[swapState.from.chain.id],
			addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals),
		)
	}

	if (linkAllowance < Number(addingAmountDecimals('3', 18))) {
		linkApproveTx = await linkContract.approve(
			conceroAddressesMap[swapState.from.chain.id],
			addingAmountDecimals('3', 18),
		)
	}

	if (bnmApproveTx !== null) await bnmApproveTx.wait()
	if (linkApproveTx !== null) await linkApproveTx.wait()
}

async function sendTransaction(swapState: SwapState, signer: providers.JsonRpcSigner) {
	const conceroContract = new ethers.Contract(
		conceroAddressesMap[swapState.from.chain.id],
		[
			'function startTransaction(address _token, uint8 _tokenType, uint256 _amount, uint64 _destinationChainSelector, address _receiver) external payable',
			'function lastGasPrices(uint64 _chainSelector) view returns (uint256)',
		],
		signer,
	)

	const srcLastGasPrice = (await conceroContract.lastGasPrices(chainSelectorsMap[swapState.from.chain.id])).mul(
		750000,
	)
	const dstLastGasPrice = (await conceroContract.lastGasPrices(chainSelectorsMap[swapState.to.chain.id])).mul(750000)
	const value = ethers.BigNumber.from(dstLastGasPrice).add(srcLastGasPrice)

	const gasPrice = await signer.getGasPrice()

	return conceroContract.startTransaction(
		swapState.from.token.address,
		'0',
		addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals),
		chainSelectorsMap[swapState.to.chain.id],
		swapState.to.address,
		{
			gasPrice,
			gasLimit: 3000000,
			value,
		},
	)
}

const setError = (swapDispatch: Dispatch<SwapAction>, swapState: SwapState, error: any) => {
	swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
	swapDispatch({
		type: 'SET_SWAP_STEPS',
		payload: [{ title: 'Transaction failed', body: 'Something went wrong', status: 'error' }],
	})

	if (error?.message.includes('user rejected transaction')) {
		console.log('User rejected transaction')
		return
	}

	void trackEvent({
		category: category.SwapCard,
		action: action.SwapFailed,
		label: 'swap_failed',
		data: { provider: 'concero', from: swapState.from, to: swapState.to, error },
	})
}

const getLogByName = async (
	id: string,
	eventName: string,
	contractAddress: string,
	viemPublicClient: any,
	fromBlock: string,
): Promise<any | null> => {
	const logs = await viemPublicClient.getLogs({
		address: contractAddress,
		abi: ConceroAbi,
		fromBlock,
		toBlock: 'latest',
	})

	const filteredLog = logs.find((log: any) => {
		const decodedLog: any = decodeEventLog({
			abi: ConceroAbi,
			data: log.data,
			topics: log.topics,
		})

		const logId = eventName === 'CCIPSent' ? log.transactionHash : decodedLog.args.ccipMessageId
		return logId?.toLowerCase() === id.toLowerCase() && decodedLog.eventName === eventName
	})

	if (!filteredLog) {
		return null
	}

	return decodeEventLog({
		abi: ConceroAbi,
		data: filteredLog.data,
		topics: filteredLog.topics,
	})
}

async function checkTransactionStatus(
	tx: providers.TransactionResponse,
	signer: providers.JsonRpcSigner,
	swapDispatch: Dispatch<SwapAction>,
	swapState: SwapState,
): Promise<number | undefined> {
	const txStart = new Date().getTime()
	const receipt = await tx.wait()

	if (receipt.status === 0) {
		setError(swapDispatch, swapState, `Transaction reverted: ${tx.hash}`)
		return
	}

	const dstPublicClient = createPublicClient({
		chain: viemChainsMap[swapState.to.chain.id],
		transport: http(),
	})
	const srcPublicClient = createPublicClient({
		chain: viemChainsMap[swapState.from.chain.id],
		transport: http(),
	})
	const latestDstChainBlock = (await dstPublicClient.getBlockNumber()) - 100n
	const latestSrcChainBlock = (await srcPublicClient.getBlockNumber()) - 100n

	const txLog = await getLogByName(
		tx.hash,
		'CCIPSent',
		conceroAddressesMap[swapState.from.chain.id],
		srcPublicClient,
		'0x' + latestSrcChainBlock.toString(16),
	)

	const ccipMessageId = txLog.args.ccipMessageId

	let dstLog = null
	let srcFailLog = null

	while (dstLog === null && srcFailLog === null) {
		;[dstLog, srcFailLog] = await Promise.all([
			getLogByName(
				ccipMessageId,
				'UnconfirmedTXAdded',
				conceroAddressesMap[swapState.to.chain.id],
				dstPublicClient,
				'0x' + latestDstChainBlock.toString(16),
			),
			getLogByName(
				ccipMessageId,
				'FunctionsRequestError',
				conceroAddressesMap[swapState.from.chain.id],
				srcPublicClient,
				'0x' + latestSrcChainBlock.toString(16),
			),
		])

		await sleep(3000)
	}

	if (srcFailLog) {
		setError(swapDispatch, swapState, srcFailLog)
		return
	}

	swapDispatch({
		type: 'SET_SWAP_STEPS',
		payload: [
			{ status: 'success', title: 'Sending transaction' },
			{
				status: 'pending',
				title: 'Confirming transaction',
			},
		],
	})

	let dstLog2 = null
	let dstFailLog = null

	while (dstLog2 === null && dstFailLog === null) {
		;[dstFailLog, dstLog2] = await Promise.all([
			getLogByName(
				ccipMessageId,
				'FunctionsRequestError',
				conceroAddressesMap[swapState.to.chain.id],
				dstPublicClient,
				'0x' + latestDstChainBlock.toString(16),
			),
			getLogByName(
				ccipMessageId,
				'TXReleased',
				conceroAddressesMap[swapState.to.chain.id],
				dstPublicClient,
				'0x' + latestDstChainBlock.toString(16),
			),
		])

		await sleep(3000)
	}

	if (dstFailLog) {
		setError(swapDispatch, swapState, dstFailLog)
		return
	}

	swapDispatch({
		type: 'SET_SWAP_STEPS',
		payload: [
			{ status: 'success', title: 'Sending transaction' },
			{
				status: 'success',
				title: 'Confirming transaction',
			},
			{
				status: 'success',
				title: 'Complete',
			},
		],
	})

	return txStart
}

export async function executeConceroRoute(
	swapState: SwapState,
	swapDispatch: Dispatch<SwapAction>,
	switchChainHook: SwitchChainHookType,
): Promise<number | undefined> {
	try {
		if (swapState.from.token.address === swapState.to.token.address) {
			swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.failed })
			swapDispatch({
				type: 'SET_SWAP_STEPS',
				payload: [{ title: 'Transaction failed', body: 'Tokens are the same', status: 'error' }],
			})
			return
		}

		swapDispatch({ type: 'SET_LOADING', payload: true })
		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.progress })
		swapDispatch({
			type: 'APPEND_SWAP_STEP',
			payload: {
				title: 'Action required',
				body: 'Please approve the transaction in your wallet',
				status: 'await',
				txLink: null,
			},
		})

		const signer = await switchChainHook(Number(swapState.from.chain.id))

		await checkAllowanceAndApprove(swapState, signer)
		const tx = await sendTransaction(swapState, signer)

		swapDispatch({
			type: 'SET_SWAP_STEPS',
			payload: [{ status: 'pending', title: 'Sending transaction' }],
		})

		const txStart = await checkTransactionStatus(tx, signer, swapDispatch, swapState)

		swapDispatch({ type: 'SET_SWAP_STAGE', payload: SwapCardStage.success })

		void trackEvent({
			category: category.SwapCard,
			action: action.SwapSuccess,
			label: 'swap_success',
			data: { provider: 'concero', from: swapState.from, to: swapState.to },
		})

		if (!txStart) return

		return (new Date().getTime() - txStart) / 1000
	} catch (error) {
		console.error('Error executing concero route', error)
		setError(swapDispatch, swapState, error)
	} finally {
		swapDispatch({ type: 'SET_LOADING', payload: false })
	}
}
