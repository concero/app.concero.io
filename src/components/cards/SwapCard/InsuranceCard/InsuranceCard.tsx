import { useEffect, useRef, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { ToggleButton } from '../../../layout/ToggleButton/ToggleButton'
import classNames from './InsuranceCard.module.pcss'
import { Button } from '../../../buttons/Button/Button'
import { colors } from '../../../../constants/colors'

export function InsuranceCard({ swapState, swapDispatch }) {
	const [isInfoVisible, setIsInfoVisible] = useState(false)
	const [springProps, setSpringProps] = useSpring(() => ({ height: 'auto' }))
	const infoContainerRef = useRef(null)

	const isChecked = swapState.selectedRoute.insurance.state === 'INSURED'

	const handleClickInsuranceButton = () => {
		swapDispatch({ type: 'TOGGLE_INSURANCE', payload: swapState.selectedRoute.id })
	}

	const handleInfoClick = event => {
		event.stopPropagation()
		setIsInfoVisible(prevState => !prevState)
	}

	useEffect(() => {
		const height = isInfoVisible ? 22 : 0
		setSpringProps({ height })
	}, [isInfoVisible])

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
						leftIcon={
							isInfoVisible ? (
								<IconChevronUp size={16} color={isChecked ? colors.green.main : colors.text.secondary} />
							) : (
								<IconChevronDown size={16} color={isChecked ? colors.green.main : colors.text.secondary} />
							)
						}
						variant="black"
						size="sq-xs"
						onClick={handleInfoClick}
					/>
				</div>
			</div>
			<animated.div className={classNames.stepsContainer} style={springProps} ref={infoContainerRef}>
				<p className={`body1 ${classNames.infoText}`}>
					{'Insure your assets with '}
					<a href="https://www.insurace.io" target="_blank" style={{ textDecoration: 'underline' }} rel="noreferrer">
						InsurAce
					</a>
					.
				</p>
			</animated.div>
		</div>
	)
}
