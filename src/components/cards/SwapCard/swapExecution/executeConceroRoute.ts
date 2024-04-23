import { type SwapState } from '../swapReducer/types'
import type { SwitchChainHookType } from '../SwapInput/types'
import { ethers, type providers } from 'ethers'
import { addingAmountDecimals } from '../../../../utils/formatting'
import ERC20 from '../../../../abi/ERC20.json'
import { linkAddressesMap } from '../../../buttons/SwapButton/linkAddressesMap'

const conceroAddressesMap: Record<string, string> = {
	'421614': '0xf829e29b4fba5c66b7718ea4ad1271000210570f',
	'11155420': '0xd309f39Ec4b2773DEf530071c70c1710060324d9',
	'84532': '0xCD3308B0911423E7CBcB0C30907655752d355991',
}

const chainSelectorsMap: Record<string, string> = {
	'421614': '3478487238524512106',
	'11155420': '5224473277236331295',
	'84532': '10344971235874465080',
}

async function checkAllowanceAndApprove(signer: providers.JsonRpcSigner, swapState: SwapState) {
	const bnmContract = new ethers.Contract(swapState.from.token.address, ERC20, signer)
	const linkContract = new ethers.Contract(linkAddressesMap[swapState.from.chain.id], ERC20, signer)
	let bnmApproveTx
	let linkApproveTx

	const bnmAllowance = await bnmContract.allowance(signer._address, conceroAddressesMap[swapState.from.chain.id])
	const linkAllowance = await linkContract.allowance(signer._address, conceroAddressesMap[swapState.from.chain.id])

	if (bnmAllowance.lt(addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals))) {
		bnmApproveTx = await bnmContract.approve(
			conceroAddressesMap[swapState.from.chain.id],
			addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals),
		)
	}

	if (linkAllowance.lt(addingAmountDecimals('3', 18))) {
		linkApproveTx = await linkContract.approve(
			conceroAddressesMap[swapState.from.chain.id],
			addingAmountDecimals('3', 18),
		)
	}

	await Promise.all([bnmApproveTx.wait(), linkApproveTx.wait()])
}

export async function executeConceroRoute(swapState: SwapState, switchChainHook: SwitchChainHookType): Promise<any> {
	try {
		const signer = await switchChainHook(Number(swapState.from.chain.id))

		await checkAllowanceAndApprove(signer, swapState)

		const conceroContract = new ethers.Contract(
			conceroAddressesMap[swapState.from.chain.id],
			[
				'function startTransaction(address _token, uint8 _tokenType, uint256 _amount, uint64 _destinationChainSelector, address _receiver) external payable',
			],
			signer,
		)

		const gasPrice = await signer.provider.getGasPrice()
		const value = gasPrice.mul(3000000000).toString()

		const tx = await conceroContract.startTransaction(
			swapState.from.token.address,
			'0',
			addingAmountDecimals(swapState.from.amount, swapState.from.token.decimals),
			chainSelectorsMap[swapState.to.chain.id],
			swapState.to.address,
			{
				gasLimit: 2000000,
				value,
			},
		)

		console.log(tx)
	} catch (error) {
		console.error('Error executing concero route', error)
	}
}
