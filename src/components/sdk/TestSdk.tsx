import { type Address, createWalletClient, custom } from 'viem'
import { findRoute } from '../../sdk/findRoute'
import { Button } from '../buttons/Button/Button'
import { executeRoute } from '../../sdk/executeRoute/executeRoute'
import { type Route } from '../../sdk/types/routeTypes'
import { type ExecutionConfigs, type ExecutionState } from '../../sdk/types/executeSettingsTypes'
import { polygon } from 'wagmi/chains'

const routeRequest = {
	fromChainId: '137',
	fromAmount: '1',
	fromTokenAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270' as Address,
	fromAddress: '0xDddDDb8a8E41C194ac6542a0Ad7bA663A72741E0' as Address,
	toChainId: '137',
	toTokenAddress: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359' as Address,
	toAddress: '0xDddDDb8a8E41C194ac6542a0Ad7bA663A72741E0' as Address,
}

export const TestSdk = () => {
	const startSwap = async () => {
		const route = (await findRoute(routeRequest)) as Route

		const walletClient = createWalletClient({
			chain: polygon,
			transport: custom(window.ethereum),
		})

		const addExecutionListener = (state: ExecutionState) => {}

		const executionConfig: ExecutionConfigs = {
			executionStateUpdateHook: addExecutionListener,
		}

		await executeRoute(walletClient, route, executionConfig)
	}

	return <Button onClick={startSwap}>Start swap (test)</Button>
}
