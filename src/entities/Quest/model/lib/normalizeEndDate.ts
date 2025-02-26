export const normalizeEndDate = (endDate: any) => {
	if (typeof endDate === 'object' && endDate.$numberDecimal) {
		return parseInt(endDate.$numberDecimal, 10)
	}
	return endDate
}
