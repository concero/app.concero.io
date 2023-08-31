export const getCardTitleByStatus = (transactionStep: string) => {
  if (transactionStep === 'input') return 'Swap'
  if (transactionStep === 'progress') return 'Swap in progress'
  if (transactionStep === 'success') return 'Swap successful'
}
