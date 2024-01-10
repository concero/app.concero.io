import { type ExecutionSettings } from '@lifi/sdk'
import { lifi } from './lifi'
import { type Route } from '@lifi/types'
import { type Signer } from 'ethers'

export const executeLifiRoute = async (signer: Signer, route: Route, settings?: ExecutionSettings): Promise<Route> =>
	await lifi.executeRoute(signer, route, settings)
