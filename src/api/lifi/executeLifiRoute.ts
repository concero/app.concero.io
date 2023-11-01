import { WalletClient } from 'wagmi'
import { Account, Transport } from 'viem'
import { Chain, ExecutionSettings } from '@lifi/sdk'
import { StandardRoute } from '../../types/StandardRoute'
import { lifi } from './lifi'

export const executeLifiRoute = async (signer: WalletClient<Transport, Chain, Account> | null, route: StandardRoute, settings?: ExecutionSettings): Promise<StandardRoute> =>
	lifi.executeRoute(signer, route, settings)
