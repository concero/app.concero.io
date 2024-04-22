import classNames from './TestnetCheckButtons.module.pcss'
import { Button } from '../../Button/Button'
import { type SwapState } from '../../../cards/SwapCard/swapReducer/types'
import { IconCheck } from '@tabler/icons-react'

interface TestnetCheckButtonsProps {
	swapState: SwapState
	testnetBalances: {
		linkBalanceSufficient: boolean
		bnmBalanceSufficient: boolean
	} | null
}

export function TestnetCheckButtons({ swapState, testnetBalances }: TestnetCheckButtonsProps) {
	return (
		<div className={classNames.container}>
			<Button
				className={classNames.button}
				variant={'primary'}
				isDisabled={!!testnetBalances?.linkBalanceSufficient}
				leftIcon={testnetBalances?.linkBalanceSufficient ? <IconCheck size={17} /> : null}
				onClick={() => {
					window.open('https://faucets.chain.link/', '_blank')
				}}
			>
				Get testnet opETH & LINK
			</Button>

			<Button
				variant={'primary'}
				isDisabled={!!testnetBalances?.bnmBalanceSufficient}
				className={classNames.button}
				leftIcon={testnetBalances?.bnmBalanceSufficient ? <IconCheck size={17} /> : null}
			>
				Get CCIPBnM tokens
			</Button>
		</div>
	)
}
