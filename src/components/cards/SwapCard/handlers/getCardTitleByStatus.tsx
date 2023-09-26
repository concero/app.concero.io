export const getCardTitleByStatus = (status: string) => {
	if (status === 'progress') return 'Swap in progress'
	if (status === 'success') return 'Swap successful'
	if (status === 'failure') return 'Swap failed'
	return 'Swap'
}
