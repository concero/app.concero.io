import { useEffect, useState } from 'react'
import { Button } from '../buttons/Button/Button'
import { WalletButton } from '../layout/Header/WalletButton/WalletButton'
import { useAccount } from 'wagmi'
import { account, config, walletClient } from '../../web3/wagmi'
import { UNISWAP_ROUTER_ABI } from './uniswap_router_abi'
import { simulateContract } from 'viem/actions'

export const WagmiTest = () => {
	const [route, setRoute] = useState<any>()
	const { isConnected } = useAccount()
	console.log(account)
	// const contract = getContract({
	// 	abi: UNISWAP_ROUTER_ABI,
	// 	address: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
	// 	client: walletClient,
	// })
	//
	// console.log('walletClient', walletClient)
	// console.log('contract', contract)

	async function executeSwap() {
		if (!isConnected) {
			console.error('Not connected')
			return
		}

		try {
			const result = await walletClient.writeContract({
				address: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45', // Uniswap V3 Swap Router address
				abi: UNISWAP_ROUTER_ABI,
				functionName: 'exactInputSingle',
				account,
				args: [
					{
						tokenIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // Address of the token you're swapping from
						tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // Address of the token you're swapping to
						fee: 3000, // Fee tier of the pool, e.g., 3000 for 0.3%
						recipient: '0x70E73f067a1fC9FE6D53151bd271715811746d3a', // Address that will receive the output tokens
						deadline: Math.floor(Date.now() / 1000) + 60 * 20, // Deadline 20 minutes from now
						amountIn: '1000000000000000000', // 1 token in, assuming 18 decimal places
						amountOutMinimum: '1000000000000000000', // Minimum amount of token out you are willing to accept
						sqrtPriceLimitX96: 0, // No limit on the price after the swap
					},
				],
			})
			console.log('result', result)
			// const abi = [
			// 	{
			// 		type: 'function',
			// 		name: 'balanceOf',
			// 		stateMutability: 'view',
			// 		inputs: [{ name: 'account', type: 'address' }],
			// 		outputs: [{ type: 'uint256' }],
			// 	},
			// 	{
			// 		type: 'function',
			// 		name: 'totalSupply',
			// 		stateMutability: 'view',
			// 		inputs: [],
			// 		outputs: [{ name: 'supply', type: 'uint256' }],
			// 	},
			// ]
			// 	const result = await readContract(config, {
			// 		abi,
			// 		address: '0x6b175474e89094c44da98b954eedeac495271d0f',
			// 		functionName: 'totalSupply',
			// 	})

			const simulatedTxRes = await simulateContract(config, {
				abi: UNISWAP_ROUTER_ABI,
				address: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45', // Uniswap V3 Swap Router address
				functionName: 'exactInputSingle',
				args: [
					{
						tokenIn: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // Address of the token you're swapping from
						tokenOut: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // Address of the token you're swapping to
						fee: 3000, // Fee tier of the pool, e.g., 3000 for 0.3%
						recipient: '0x70E73f067a1fC9FE6D53151bd271715811746d3a', // Address that will receive the output tokens
						deadline: Math.floor(Date.now() / 1000) + 60 * 20, // Deadline 20 minutes from now
						amountIn: '1000000000000000000', // 1 token in, assuming 18 decimal places
						amountOutMinimum: '1000000000000000000', // Minimum amount of token out you are willing to accept
						sqrtPriceLimitX96: 0, // No limit on the price after the swap
					},
				],
			})

			console.log('simulatedTxRes', simulatedTxRes)

			// const result = await writeContract(config, {
			// 	abi,
			// 	address: '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
			// 	functionName: 'swapExactTokensForTokens',
			// 	args: [
			// 		'1000000000000000000',
			// 		'1000000000000000000',
			// 		['0x11b815efb8f581194ae79006d24e0d814b7697f6'],
			// 		'0x70E73f067a1fC9FE6D53151bd271715811746d3a',
			// 	],
			// })
			// console.log('result', result)
		} catch (error) {
			console.error('Error executing swap:', error)
		}
	}
	// const { isConnected, connector } = useAccount()

	// async function connectWallet() {
	// 	try {
	// 		const provider = new ethers.providers.Web3Provider(window.ethereum)
	// 		const signer = provider.getSigner()
	// 		setSigner(signer) // Save the signer for later transactions
	// 	} catch (error) {
	// 		console.error('Error connecting to wallet:', error)
	// 	}
	// }
	//
	// async function getRoute({
	// 	fromToken,
	// 	toToken,
	// 	fromChainId,
	// 	toChainId,
	// 	amount,
	// 	slippageTolerance,
	// }: fetchRouteParams) {
	// 	console.log('fetchRoute')
	// 	const res = await fetchRoute({ fromToken, toToken, fromChainId, toChainId, amount, slippageTolerance })
	// 	setRoute(res)
	// 	return res
	// }
	// useEffect(() => {
	// 	getRoute({
	// 		fromToken: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
	// 		toToken: '0x25559f0abbaf2a928239d2f419181147cc2dad74',
	// 		fromChainId: 1,
	// 		toChainId: 1,
	// 		amount: '1000000000000000000',
	// 		slippageTolerance: '0.5',
	// 	})
	// }, [])

	useEffect(() => {
		setRoute({
			tokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
			poolAddress: '0x11b815efb8f581194ae79006d24e0d814b7697f6',
			pool: {
				_id: '65e2269a01994d2405249882',
				address: '0x11b815efb8f581194ae79006d24e0d814b7697f6',
				chainId: '1',
				dex: 'uniswap',
				feeTier: '0.5',
				feesUsd: '39761229.6124632267514279243708229',
				liquidity: '1522393586821495706',
				tokens: [
					{
						_id: '65e2269801994d2405240acc',
						address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
						chainId: '1',
						__v: 0,
						decimals: 18,
						name: 'Wrapped Ether',
						price: '0.0000002987822415708207320090743260818667',
						symbol: 'WETH',
						totalValueLocked: '594765.046756222469079695',
						totalValueLockedUsd: '2037591929.069855110603709326947184',
						volume: '433603345.943983665069881432',
						volumeUsd: '935453668493.6076121510907705884333',
					},
					{
						_id: '65e2269801994d2405240ad7',
						address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
						chainId: '1',
						__v: 0,
						decimals: 6,
						name: 'Tether USD',
						price: '3.012297746168447421953988421294725',
						symbol: 'USDT',
						totalValueLocked: '222925200.540408',
						totalValueLockedUsd: '222925200.540408',
						volume: '224830862110.25747',
						volumeUsd: '225149800348.6348098843671329241243',
					},
				],
				totalValueLockedUsd: '72628229.5017658665677300766062707',
				volumeUsd: '79522459224.92645350285584874164405',
			},
		})
	}, [])

	return (
		<div>
			<w3m-button />
			<WalletButton />
			{/* <h1>{isConnected ? 'Connected' : 'Disconnected'}</h1> */}
			<Button onClick={executeSwap}>Swap</Button>
		</div>
	)
}
