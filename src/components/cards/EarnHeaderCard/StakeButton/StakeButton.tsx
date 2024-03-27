import { type Dispatch } from 'react'
import { useSwitchChain } from 'wagmi'
import { Button } from '../../../buttons/Button/Button'
import classNames from './StakeButton.module.pcss'
import { handleExecuteSwap } from '../ManageModal/swapExecution/handleExecuteSwap'
import { type ManageState } from '../ManageModal/useEarnReducer/types'
import { buttonMessages, Status } from '../ManageModal/constants'
import { buttonClassNames, buttonIcons } from './styleHandlers'
import { type SwitchChainParameters, type SwitchChainReturnType } from '@wagmi/core'
import { useTranslation } from 'react-i18next'

interface StakeButtonProps {
	manageState: ManageState
	manageDispatch: Dispatch<any>
}

export type SwitchChain = (chainId_?: SwitchChainParameters['chainId']) => Promise<SwitchChainReturnType>

export function StakeButton({ manageState, manageDispatch }: StakeButtonProps) {
	const { switchChainAsync } = useSwitchChain()
	const { status } = manageState
	const isDisabled = status !== Status.stake && status !== Status.withdraw
	const { t } = useTranslation()

	return (
		<Button
			leftIcon={buttonIcons[status]}
			size="lg"
			isLoading={manageState.isLoading}
			className={classNames[buttonClassNames(status)]}
			onClick={async () => {
				await handleExecuteSwap(manageState, manageDispatch, switchChainAsync)
			}}
			isDisabled={isDisabled}
		>
			{t(buttonMessages[status])}
		</Button>
	)
}
