export type TPaginationParams = {
	page: number
	limit: number
}

export type TApiResponse<TData extends any = any> = {
	success: boolean
	data: TData
}
