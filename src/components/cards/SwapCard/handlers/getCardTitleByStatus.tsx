import { SwapCardStage } from '../swapReducer/types'

export const getCardTitleByStatus = (status: SwapCardStage): string => {
	const statusMap: { [key in string]: string } = {
		[SwapCardStage.progress]: 'Swap in progress',
		[SwapCardStage.success]: 'Swap successful',
		[SwapCardStage.failed]: 'Swap failed',
		[SwapCardStage.contactSupport]: 'Contact support',
	}

	return statusMap[status] ?? 'Swap'
}
