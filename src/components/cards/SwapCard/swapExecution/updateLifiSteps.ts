const getStepStatus = (action) => {
  switch (action.status.toLowerCase()) {
    case 'failed':
      return 'error'
    case 'done':
      return 'success'
    case 'action_required':
      return 'pending'
    default:
      return 'await'
  }
}

const getStepTitle = (action) => {
  return action.message || action.error.message || null
}

export const updateLifiSteps = ({ swapDispatch, selectedRoute }) => {
  if (!selectedRoute.execution[0]) return

  const messages = selectedRoute.execution[0]?.process?.map((action) => {
    return {
      title: getStepTitle(action),
      body: action.substatusMessage || null,
      status: getStepStatus(action),
      txLink: action.txLink || null,
    }
  })

  swapDispatch({
    type: 'SET_SWAP_PROGRESS',
    payload: messages,
  })
}
