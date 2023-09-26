/**
 Logs an error to the console and sends it to an external error tracking service, if available.
 @param {Error} error - The error to be logged.
 @param {*} [additionalInfo] - Any additional information to be included in the error log.
 @returns {void}
 */
export const logError = (error: Error, additionalInfo?: any): void => {
	console.error(`Error: ${error.message}`, error, additionalInfo)

	// Send the error to an external error tracking service (e.g., Sentry, Rollbar)
	// Example: Sentry.captureException(error, { extra: additionalInfo });
}

/**
 Wraps a function with error handling logic to log and handle any errors that may occur.
 @template TArgs - The types of the function arguments.
 @template TResult - The return type of the function.
 @param {(...args: TArgs) => TResult} fn - The function to wrap with error handling logic.
 @param {string} errorMessage - The error message to be logged if an error occurs.
 @returns {(...args: TArgs) => TResult | null} - The wrapped function with error handling logic.
 */
export const withErrorHandling =
	<TArgs extends any[], TResult>(fn: (...args: TArgs) => TResult, errorMessage: string): ((...args: TArgs) => TResult | null) =>
	(...args: TArgs): TResult | null => {
		try {
			return fn(...args)
		} catch (error) {
			logError(new Error(errorMessage), { originalError: error })
			return null
		}
	}

/**
 Wraps an async function with error handling logic to log and handle any errors that may occur.
 @template TArgs - The types of the function arguments.
 @template TResult - The return type of the function.
 @param {(...args: TArgs) => Promise<TResult>} fn - The async function to wrap with error handling logic.
 @param {string} errorMessage - The error message to be logged if an error occurs.
 @returns {(...args: TArgs) => Promise<TResult | null>} - The wrapped async function with error handling logic.
 */
export const withErrorHandlingAsync =
	<TArgs extends any[], TResult>(fn: (...args: TArgs) => Promise<TResult>, errorMessage: string): ((...args: TArgs) => Promise<TResult | null>) =>
	async (...args: TArgs): Promise<TResult | null> => {
		try {
			return await fn(...args)
		} catch (error) {
			logError(new Error(errorMessage), { originalError: error })
			return null
		}
	}
