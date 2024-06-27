import { type Address, createWalletClient, custom } from 'viem'
import { findRoute } from '../../sdk/findRoute'
import { Button } from '../buttons/Button/Button'
import { arbitrumSepolia, baseSepolia, mainnet, optimismSepolia } from 'viem/chains'
import { executeRoute } from '../../sdk/executeRoute'
import { type Route } from '../../sdk/types/routeTypes'
import { type ExecutionConfigs, type ExecutionState } from '../../sdk/types/executeSettingsTypes'

const routeRequest = {
	fromChainId: '1',
	fromAmount: '10',
	fromTokenAddress: '0xd2Cb8786C0Ec3680C55C9256371F3577fE1C6A9e' as Address,
	fromAddress: '0xd2Cb8786C0Ec3680C55C9256371F3577fE1C6A9e' as Address,
	toChainId: '10',
	toTokenAddress: '0xd2Cb8786C0Ec3680C55C9256371F3577fE1C6A9e' as Address,
	toAddress: '0xd2Cb8786C0Ec3680C55C9256371F3577fE1C6A9e' as Address,
}

export const TestSdk = () => {
	const startSwap = async () => {
		const route = (await findRoute(routeRequest)) as Route

		const walletClient = createWalletClient({
			chain: optimismSepolia,
			transport: custom(window.ethereum),
		})

		const addExecutionListener = (state: ExecutionState) => {
			console.log(state)
		}

		const executionConfig: ExecutionConfigs = {
			executionStateUpdateHook: addExecutionListener,
		}

		await executeRoute(walletClient, route, executionConfig)
	}

	return <Button onClick={startSwap}>Start swap (test)</Button>
}
