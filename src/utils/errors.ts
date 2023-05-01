export const logError = (error: Error, additionalInfo?: any): void => {
  // Log the error to the console
  console.error(`Error: ${error.message}`, error, additionalInfo)

  // Send the error to an external error tracking service (e.g., Sentry, Rollbar)
  // if you have it set up in your project.
  // Example: Sentry.captureException(error, { extra: additionalInfo });
}

export const withErrorHandling = <TArgs extends any[], TResult>(
  fn: (...args: TArgs) => TResult,
  errorMessage: string,
): ((...args: TArgs) => TResult | null) => {
  return (...args: TArgs): TResult | null => {
    try {
      return fn(...args)
    } catch (error) {
      logError(new Error(errorMessage), { originalError: error })
      return null
    }
  }
}

export const withErrorHandlingAsync = <TArgs extends any[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  errorMessage: string,
): ((...args: TArgs) => Promise<TResult | null>) => {
  return async (...args: TArgs): Promise<TResult | null> => {
    try {
      return await fn(...args)
    } catch (error) {
      logError(new Error(errorMessage), { originalError: error })
      return null
    }
  }
}
