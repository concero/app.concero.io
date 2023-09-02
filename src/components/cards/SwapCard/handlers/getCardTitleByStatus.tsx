export const getCardTitleByStatus = (stage: string) => {
  if (stage === 'input') return 'Swap'
  if (stage === 'progress') return 'Swap in progress'
  if (stage === 'success') return 'Swap successful'
  if (stage === 'error') return 'Swap failed'
}
