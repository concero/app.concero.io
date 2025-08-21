import { Union } from '@/types/utils'

export type TPaginationParams = {
	take: number
	skip: number
}
export type TPaginationResponse = {
	take: number
	skip: number
	count: number
}

export type ApiSuccess<TData> = {
	code: Http.Code.Enum.OK
	message?: string
	payload: TData
}

export type ApiError<TMessage> = {
	code: Exclude<Http.Code.Enum, Http.Code.Enum.OK>
	message: TMessage
	payload: null
}

export type TApiResponse<TData, TMessage extends string = string> = ApiSuccess<TData> | ApiError<TMessage>

export namespace Http {
	export type Code = Union<Code.Enum>
	export namespace Code {
		export enum Enum {
			OK = 'ok',
			// 401
			TOKEN_INVALID = 'token_invalid',
			TOKEN_NOT_PROVIDED = 'token_not_provided',
			WRONG_AUTH_DATA = 'wrong_auth_data',
			// 400
			BAD_REQUEST = 'bad_request',
			// 404
			USER_NOT_FOUND = 'user_not_found',
			NONCE_NOT_FOUND = 'nonce_not_found',
			// 500
			UNHANDLED_ERROR = 'unhandled_error',
		}
	}
}

const isValidHttpCode = (code: any): code is Http.Code.Enum => {
	return Object.values(Http.Code.Enum).includes(code)
}

export const isApiErrorResponse = <TMessage extends string = string>(
	obj: any,
): obj is { code: Exclude<Http.Code.Enum, Http.Code.Enum.OK>; message?: TMessage; payload: any } => {
	const result = obj && typeof obj === 'object' && isValidHttpCode(obj.code) && obj.code !== Http.Code.Enum.OK
	if (__IS_DEV__ && result && !obj?.message) {
		console.warn('DEVELOPER!!!  Request is failed, but message is not provided')
	}
	return result
}

export const handleUnknownError = <TFallBackMessage extends string = string>(
	error: unknown,
	fallbackMessage?: TFallBackMessage,
) => {
	if (isApiErrorResponse<TFallBackMessage>(error)) {
		return {
			code: error.code,
			message: error.message ?? fallbackMessage ?? Http.Code.Enum.UNHANDLED_ERROR,
			payload: null,
		} as const
	}
	return {
		code: Http.Code.Enum.UNHANDLED_ERROR,
		message: fallbackMessage ?? Http.Code.Enum.UNHANDLED_ERROR,
		payload: null,
	} as const
}

export const createApiHandler = async <TData, TError extends string = string>(
	request: () => Promise<TApiResponse<TData, TError>>,
	fallbackError?: TError,
) => {
	let response: TApiResponse<TData, TError>

	try {
		response = await request()
	} catch (error: unknown) {
		throw handleUnknownError(error, fallbackError)
	}

	if (!response?.code) {
		if (__IS_DEV__) {
			console.warn('DEVELOPER!!! Request succeeded but no code provided')
		}
		throw {
			code: Http.Code.Enum.UNHANDLED_ERROR,
			message: fallbackError ?? Http.Code.Enum.UNHANDLED_ERROR,
			payload: null,
		}
	}

	if (response.code !== Http.Code.Enum.OK) {
		throw response
	}

	return response
}
