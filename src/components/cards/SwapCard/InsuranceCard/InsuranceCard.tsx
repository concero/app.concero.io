import { ToggleButton } from '../../../layout/ToggleButton/ToggleButton'
import classNames from './InsuranceCard.module.pcss'
import { Button } from '../../../buttons/Button/Button'
import { colors } from '../../../../constants/colors'

export const InsuranceCard = ({ swapState, swapDispatch }) => {
  const isChecked = swapState.selectedRoute.insurance.state === 'INSURED'

  const handleClickInsuranceButton = () => {
    swapDispatch({ type: 'TOGGLE_INSURANCE', payload: swapState.selectedRoute.id })
  }

  return (
    <div className={`card ${classNames.container} ${isChecked ? classNames.checked : classNames.unchecked}`}>
      <div className={classNames.innerContainer}>
        <div className={classNames.sideContainer}>
          <ToggleButton value={isChecked} onChange={handleClickInsuranceButton} />
          <h5>Insurance</h5>
        </div>
        <div className={classNames.sideContainer}>
          <h4>${swapState.selectedRoute.insurance.fee_amount_usd}</h4>
          <Button
            leftIcon={{ name: 'ChevronDown', iconProps: { color: isChecked ? colors.green.main : colors.text.secondary, size: 16 } }}
            variant={'black'}
            size={'sq-xs'}
          />
        </div>
      </div>
    </div>
  )
}
