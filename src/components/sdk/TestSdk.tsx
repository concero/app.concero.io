import { type Address, createWalletClient, custom } from 'viem'
import { findRoute } from '../../sdk/findRoute'
import { Button } from '../buttons/Button/Button'
import { executeRoute } from '../../sdk/executeRoute/executeRoute'
import { type Route } from '../../sdk/types/routeTypes'
import { type ExecutionConfigs, type ExecutionState } from '../../sdk/types/executeSettingsTypes'
import { polygon } from 'wagmi/chains'

const routeRequest = {
	fromChainId: '137',
	fromAmount: '0.003793952',
	fromTokenAddress: '0xd93f7E271cB87c23AaA73edC008A79646d1F9912' as Address,
	fromAddress: '0xDddDDb8a8E41C194ac6542a0Ad7bA663A72741E0' as Address,
	toChainId: '137',
	toTokenAddress: '0xA649325Aa7C5093d12D6F98EB4378deAe68CE23F' as Address,
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
