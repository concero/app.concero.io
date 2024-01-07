import { type Dispatch } from 'react'
import { useSwitchNetwork } from 'wagmi'
import { Button } from '../../../buttons/Button/Button'
import classNames from './StakeButton.module.pcss'
import { handleExecuteSwap } from '../ManageModal/swapExecution/handleExecuteSwap'
import { type ManageState } from '../ManageModal/useEarnReducer/types'
import { buttonMessages, Status } from '../ManageModal/constants'
import { buttonClassNames, buttonIcons } from './styleHandlers'
import { type SwitchNetworkArgs, type SwitchNetworkResult } from '@wagmi/core'
import { useTranslation } from 'react-i18next'

interface StakeButtonProps {
	manageState: ManageState
	manageDispatch: Dispatch<any>
}

type SwitchChainNetwork = (chainId_?: SwitchNetworkArgs['chainId']) => Promise<SwitchNetworkResult>

export function StakeButton({ manageState, manageDispatch }: StakeButtonProps) {
	const { switchNetworkAsync } = useSwitchNetwork()
	const { status } = manageState
	const isDisabled = status !== Status.stake && status !== Status.withdraw
	const { t } = useTranslation()

	return (
		<Button
			leftIcon={buttonIcons[status as Status]}
			size="lg"
			isLoading={manageState.isLoading}
			className={classNames[buttonClassNames(status)]}
			onClick={async () => {
				await handleExecuteSwap(manageState, manageDispatch, switchNetworkAsync as SwitchChainNetwork)
			}}
			isDisabled={isDisabled}
		>
			{t(buttonMessages[status as Status])}
		</Button>
	)
}
