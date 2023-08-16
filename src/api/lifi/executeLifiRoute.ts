import { WalletClient } from 'wagmi'
import { Account, Transport } from 'viem'
import { Chain, ExecutionSettings } from '@lifi/sdk'
import { Route } from './types'
import { lifi } from './lifi'

export const executeLifiRoute = async (
  signer: WalletClient<Transport, Chain, Account> | null,
  route: Route,
  settings?: ExecutionSettings,
): Promise<Route> => lifi.executeRoute(signer, route, settings)
