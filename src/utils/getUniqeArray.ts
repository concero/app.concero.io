export const getUniqueArray = (array: any[], filed: string) => {
	const table: Record<number, any> = {}
	return array.filter(item => !table[item[filed]] && (table[item[filed]] = 1))
}
