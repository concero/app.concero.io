import { ExecutionSettings } from '@lifi/sdk'
import { lifi } from './lifi'
import { Route } from '@lifi/types'
import { Signer } from 'ethers'

export const executeLifiRoute = async (signer: Signer, route: Route, settings?: ExecutionSettings): Promise<Route> => lifi.executeRoute(signer, route, settings)
