import { SwapCardStage } from '../swapReducer/types'
import { useTranslation } from 'react-i18next'

export const getCardTitleByStatus = (status: SwapCardStage): string => {
	const { t } = useTranslation()

	const statusMap: { [key in string]: string } = {
		[SwapCardStage.progress]: t('swapCard.headerTitle.progress'),
		[SwapCardStage.success]: t('swapCard.headerTitle.success'),
		[SwapCardStage.failed]: t('swapCard.headerTitle.failed'),
		[SwapCardStage.contactSupport]: t('swapCard.headerTitle.contactSupport'),
	}

	return statusMap[status] ?? t('swapCard.headerTitle.swap')
}
