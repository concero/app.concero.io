import { type SwapState } from '../swapReducer/types'
import type { SwitchChainHookType } from '../SwapInput/types'
import { ethers } from 'ethers'

const conceroAddressesMap: Record<string, string> = {
	'421614': '0xf829e29b4fba5c66b7718ea4ad1271000210570f',
	'11155420': '0x58d641e3ca6d9a26d7a5140ce57cc309c377990d',
	'84532': '0x4e54210d8661ad2a6b934f681cdc5542a0538670',
}

const chainSelectorsMap: Record<string, string> = {
	'421614': '3478487238524512106',
	'11155420': '5224473277236331295',
	'84532': '10344971235874465080',
}

export async function executeConceroRoute(swapState: SwapState, switchChainHook: SwitchChainHookType): Promise<any> {
	try {
		const signer = await switchChainHook(Number(swapState.from.chain.id))

		// check and send if needed link and bnm approvals

		const conceroContract = new ethers.Contract(
			conceroAddressesMap[swapState.from.chain.id],
			[
				'function startTransaction(address _token, uint8 _tokenType, uint256 _amount, uint64 _destinationChainSelector, address _receiver) external payable ',
			],
			signer,
		)

		const tx = await conceroContract.startTransaction(
			swapState.from.token.address,
			'0',
			swapState.from.amount,
			chainSelectorsMap[swapState.to.chain.id],
			swapState.to.address,
		)

		console.log(tx)
	} catch (error) {
		console.error('Error executing concero route', error)
	}
}
