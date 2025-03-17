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

export type TApiResponse<TData extends any = any> = {
	success: boolean
	data: TData
}
