import { useContext } from 'react'
import { IconArrowWaveRightUp, IconClock, IconPigMoney } from '@tabler/icons-react'
import { Tag } from '../../tags/Tag/Tag'
import classNames from './RouteCard.module.pcss'
import { type StandardRoute } from '../../../types/StandardRoute'
import { capitalize, numberToFormatString, secondsConverter } from '../../../utils/formatting'
import { Beacon } from '../../layout/Beacon/Beacon'
import { InsuranceContext } from '../SwapCard/InsuranceContext'
import { useTranslation } from 'react-i18next'

export const renderTags = (route: StandardRoute, isSelected: boolean, getTextColor: () => string, getIconColor: () => string) => {
	const advantageTagText = route?.tags[0]?.toLowerCase() === 'recommended' ? 'best' : route?.tags[0]?.toLowerCase()
	const { toggleInsurance } = useContext(InsuranceContext)
	const { t } = useTranslation()

	const handleInsuranceButtonClick = event => {
		event.stopPropagation()
		toggleInsurance(route.id)
	}

	return (
		<div className={classNames.infoTagsContainer}>
			{route?.tags[0]?.length > 0 ? (
				<Tag color={route.tags[0].toLowerCase()}>
					<p style={{ color: 'inherit', flexWrap: 'nowrap' }}>{capitalize(advantageTagText)}</p>
				</Tag>
			) : null}
			{route.insurance ? (
				<Tag
					color="green"
					onClick={e => {
						handleInsuranceButtonClick(e)
					}}
				>
					<p style={{ color: 'inherit', flexWrap: 'nowrap' }}>{t('swapCard.insurance')}</p>
					<Beacon isOn={route.insurance?.state === 'INSURED'} color="green" />
				</Tag>
			) : null}
			{route.transaction_time_seconds ? (
				<Tag color="transparent" leftIcon={<IconClock size={20} color={getIconColor()} />}>
					<h5 className={`${classNames.bodyColor} ${getTextColor()}`}>{secondsConverter(route.transaction_time_seconds)}</h5>
				</Tag>
			) : null}
			{route.slippage_percent ? (
				<Tag color="transparent" leftIcon={<IconArrowWaveRightUp size={20} color={getIconColor()} />}>
					<h5 className={`${classNames.bodyColor} ${getTextColor()}`}>{numberToFormatString(route.slippage_percent)}%</h5>
				</Tag>
			) : null}
			{route.cost.total_gas_usd ? (
				<Tag color="transparent" leftIcon={<IconPigMoney size={20} color={getIconColor()} />}>
					<h5 className={`${classNames.bodyColor} ${getTextColor()}`}>${route.cost.total_gas_usd}</h5>
				</Tag>
			) : null}
		</div>
	)
}
