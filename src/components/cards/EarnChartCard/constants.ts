export enum ChartType {
	TVLAPY,
	SUPPLYAPY,
	SUPPLY7D,
}

export const buttonsData = [
	{
		title: 'TVL & APY',
		type: ChartType.TVLAPY,
	},
	{
		title: 'Supply APY',
		type: ChartType.SUPPLYAPY,
	},
	{
		title: '7d moving avg of Supply',
		type: ChartType.SUPPLY7D,
	},
]
