import { Dispatch } from 'react'
import { useSwitchNetwork } from 'wagmi'
import { IconCornerDownRight } from '@tabler/icons-react'
import { Button } from '../../../buttons/Button/Button'
import { handleExecuteSwap } from '../ManageModal/handleExecuteSwap'
import { ManageState } from '../ManageModal/useManageReducer/types'
import { buttonMessages, Status } from '../ManageModal/constants'

interface StakeButtonProps {
  manageState: ManageState
  manageDispatch: Dispatch<any>
}

const buttonIcons = {
  [Status.swap]: <IconCornerDownRight size={18} />,
  [Status.input]: '',
}

const buttonClassNames = {
  [Status.swap]: 'swap',
  [Status.input]: 'input',
  [Status.success]: 'success',
  [Status.failure]: 'failure',
}

export function StakeButton({ manageState, manageDispatch }: StakeButtonProps) {
  const { switchNetworkAsync } = useSwitchNetwork()

  return (
    <Button
      leftIcon={buttonIcons[manageState.status]}
      size={'lg'}
      isLoading={manageState.isLoading}
      onClick={() => handleExecuteSwap(manageState, manageDispatch, switchNetworkAsync)}
    >
      {buttonMessages[manageState.status]}
    </Button>
  )
}
