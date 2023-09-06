import { TextInput } from '../../../../input/TextInput'
import classNames from './AddressInput.module.pcss'

export const AddressInput = ({ swapState, swapDispatch }) => {
  const handleChangeInput = (value: string) => swapDispatch({ type: 'SET_TO_ADDRESS', payload: value })

  return (
    <div className={classNames.container}>
      <p className={'body1'}>Destination address</p>
      <TextInput
        placeholder={'Enter destination address'}
        variant={'inline'}
        onChangeText={handleChangeInput}
        value={swapState.to.address}
        isDisabled={swapState.routes.length}
      />
    </div>
  )
}
