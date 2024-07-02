import { type Step } from '../types/routeTypes'
import { type Address, encodeAbiParameters } from 'viem'

const uniswapV3RouterAddressesMap: Record<string, string> = {
	'1': '0xE592427A0AEce92De3Edee1F18E0157C05861564',
	'137': '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45',
}

export function buildDexData(step: Step, recipient: Address) {
	return encodeAbiParameters(
		[{ type: 'address' }, { type: 'uint24' }, { type: 'address' }, { type: 'uint160' }],
		[
			uniswapV3RouterAddressesMap[step.from.chainId],
			step.tool.additional_info.fee,
			recipient,
			step.tool.additional_info.sqrtPriceX96,
		],
	)
}
