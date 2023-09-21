export enum ModalType {
  input = 0,
  tokens = 1,
  chains = 2,
}

export enum SwapType {
  stake = 0,
  withdraw = 1,
}

export enum Status {
  input = 0,
  swap = 1,
  loading = 2,
  success = 3,
  failure = 4,
  canceled = 5,
  balanceError = 6,
  unknownError = 7,
  noRoute = 8,
}

export const buttonMessages = {
  [Status.input]: 'Enter amount to swap',
  [Status.swap]: 'Stake',
  [Status.loading]: '',
  [Status.success]: 'Swap started successfully!',
  [Status.failure]: 'Failure',
  [Status.canceled]: 'Canceled by user',
  [Status.balanceError]: 'Insufficient balance',
  [Status.unknownError]: 'Something went wrong.',
  [Status.noRoute]: 'No route found',
}
