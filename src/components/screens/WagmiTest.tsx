import { useEffect, useState } from 'react'
import { Button } from '../buttons/Button/Button'
import { WalletButton } from '../layout/Header/WalletButton/WalletButton'
import { useAccount, useWriteContract } from 'wagmi'
import UNISWAP_ROUTER_ABI from './uniswap_router_abi.json'
import { config } from '../../web3/wagmi'
import { simulateContract } from '@wagmi/core'

export const WagmiTest = () => {
	const [route, setRoute] = useState<any>()
	const { writeContract } = useWriteContract()
	const { isConnected, connector } = useAccount()

	async function executeSwap() {
		if (!isConnected) {
			console.error('Not connected')
			return
		}
		// console.log(await switchChain(config, { chainId: mainnet.id }))
		const abi = UNISWAP_ROUTER_ABI
		try {
			console.log('Executing swap')
			const simulatedTxRes = await simulateContract(config, {
				abi,
				address: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
				functionName: 'swapExactTokensForTokens',
				args: [
					'1000000000000000000',
					'1000000000000000000',
					['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x25559f0abbaf2a928239d2f419181147cc2dad74'],
					'0x11b815efb8f581194ae79006d24e0d814b7697f6',
				],
			})
			console.log('simulatedTxRes', simulatedTxRes)
		} catch (error) {
			// const result = await writeContract(config, {
			// 	abi,
			// 	address: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
			// 	functionName: 'swapExactTokensForTokens',
			// 	args: [
			// 		'1000000000000000000',
			// 		'1000000000000000000',
			// 		['0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', '0x25559f0abbaf2a928239d2f419181147cc2dad74'],
			// 		'0x11b815efb8f581194ae79006d24e0d814b7697f6',
			// 	],
			// })
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
