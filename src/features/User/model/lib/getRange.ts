export const getRangeArr = (start: number, end: number): number[] => {
	return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
