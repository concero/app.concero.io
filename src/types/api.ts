/**@deprecated */
export type TPaginationParams = {
	page: number
	limit: number
}
/**@deprecated */
export type TApiResponse<TData extends any = any> = {
	success: boolean
	data: TData
}
