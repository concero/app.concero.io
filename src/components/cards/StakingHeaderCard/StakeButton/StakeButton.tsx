import { Dispatch } from 'react'
import { useSwitchNetwork } from 'wagmi'
import { IconCornerDownRight, IconWallet } from '@tabler/icons-react'
import { Button } from '../../../buttons/Button/Button'
import classNames from './StakeButton.module.pcss'
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
  [Status.balanceError]: <IconWallet size={18} />,
}

function buttonClassNames(status) {
  switch (status) {
    case Status.input || Status.loading || Status.noRoute:
      return 'disabled'
    case Status.swap:
      return ''
    case Status.balanceError || Status.unknownError:
      return 'wrong'
    case Status.success:
      return 'success'
    default:
      return 'disabled'
  }
}

export function StakeButton({ manageState, manageDispatch }: StakeButtonProps) {
  const { switchNetworkAsync } = useSwitchNetwork()
  const { status } = manageState
  const isDisabled =
    status === Status.input || status === Status.loading || status === Status.noRoute || status === Status.unknownError || status === Status.balanceError

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
