export interface SelectItem {
	title: string
	value: string
}

export const timeFilters: SelectItem[] = [
	{
		title: 'Today',
		value: 'today',
	},
	{
		title: 'This week',
		value: 'this week',
	},
	{
		title: 'This month',
		value: 'this month',
	},
	{
		title: 'All-time',
		value: 'all-time',
	},
]
