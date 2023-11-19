export enum ModalType {
	input = 0,
	tokens = 1,
	chains = 2,
	progress = 3,
	success = 4,
	failure = 5,
}

export enum SwapType {
	stake = 0,
	withdraw = 1,
}

export enum Status {
	input = 'input',
	stake = 1,
	loading = 2,
	success = 'success',
	failed = 'failed',
	progress = 'progress',
	canceled = 5,
	balanceError = 6,
	unknownError = 7,
	noRoute = 8,
	thisMakeTakeAWhile = 9,
	withdraw = 10,
}

export const buttonMessages: { [key in Status]: string } = {
	[Status.input]: 'button.enterAmountToSwap',
	[Status.stake]: 'button.stake',
	[Status.withdraw]: 'button.withdraw',
	[Status.loading]: '',
	[Status.success]: 'button.swapStartedSuccessfully',
	[Status.failed]: 'button.failure',
	[Status.canceled]: 'button.canceledByUser',
	[Status.balanceError]: 'button.insufficientBalance',
	[Status.unknownError]: 'button.somethingWentWrong',
	[Status.noRoute]: 'button.noRoutesFound',
	[Status.thisMakeTakeAWhile]: 'button.mayTakeAWhile',
}
