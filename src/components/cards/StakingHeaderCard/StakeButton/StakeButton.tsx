import { Dispatch } from 'react'
import { useSwitchNetwork } from 'wagmi'
import { Button } from '../../../buttons/Button/Button'
import classNames from './StakeButton.module.pcss'
import { handleExecuteSwap } from '../ManageModal/handleExecuteSwap'
import { ManageState } from '../ManageModal/useManageReducer/types'
import { buttonMessages, Status } from '../ManageModal/constants'
import { buttonClassNames, buttonIcons } from './styleHandlers'

interface StakeButtonProps {
  manageState: ManageState
  manageDispatch: Dispatch<any>
}

export function StakeButton({ manageState, manageDispatch }: StakeButtonProps) {
  const { switchNetworkAsync } = useSwitchNetwork()
  const { status } = manageState
  const isDisabled =
    status === Status.input ||
    status === Status.loading ||
    status === Status.noRoute ||
    status === Status.unknownError ||
    status === Status.balanceError ||
    status === Status.canceled ||
    status === Status.success

  return (
    <Button
      leftIcon={buttonIcons[status]}
      size={'lg'}
      isLoading={manageState.isLoading}
      className={classNames[buttonClassNames(status)]}
      onClick={() => handleExecuteSwap(manageState, manageDispatch, switchNetworkAsync)}
      isDisabled={isDisabled}
    >
      {buttonMessages[status]}
    </Button>
  )
}
