export type TApiGetResponse<TData extends any> = {
	success: boolean
	data: TData
	metaData: {
		totalCount: number
		pageSize: number
		pageNumber: number
		totalPage: number
	}
}
export type TPaginationParams = {
	page: number
	limit: number
}

type TErrorGetResponse<TError> = {
	success: false
	error: TError
}
type TDataGetResponse<TData> = {
	success: true
	data: TData
}

export type TApiResponse<
	TData extends unknown = unknown,
	TError extends unknown = unknown,
	success extends boolean | void = false,
> = success extends void
	? TDataGetResponse<TData> | TErrorGetResponse<TError>
	: success extends true
		? TDataGetResponse<TData>
		: TErrorGetResponse<TError>
