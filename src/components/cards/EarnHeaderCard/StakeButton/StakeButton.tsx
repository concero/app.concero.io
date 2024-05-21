import { type Dispatch } from 'react'
import { type ManageState } from '../ManageModal/useEarnReducer/types'

interface StakeButtonProps {
	manageState: ManageState
	manageDispatch: Dispatch<any>
}

// type SwitchChainNetwork = (chainId_?: SwitchNetworkArgs['chainId']) => Promise<SwitchNetworkResult>

export function StakeButton({ manageState, manageDispatch }: StakeButtonProps) {
	// const { switchNetworkAsync } = useSwitchNetwork()
	// const { status } = manageState
	// const isDisabled = status !== Status.stake && status !== Status.withdraw
	// const { t } = useTranslation()
	//
	// return (
	// 	<Button
	// 		leftIcon={buttonIcons[status as Status]}
	// 		size="lg"
	// 		isLoading={manageState.isLoading}
	// 		className={classNames[buttonClassNames(status)]}
	// 		onClick={async () => {
	// 			await handleExecuteSwap(manageState, manageDispatch, switchNetworkAsync as SwitchChainNetwork)
	// 		}}
	// 		isDisabled={isDisabled}
	// 	>
	// 		{t(buttonMessages[status as Status])}
	// 	</Button>
	// )
}
