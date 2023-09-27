import { IconChartPie, IconLayoutGrid, IconRipple, IconSeeding } from '@tabler/icons-react'

export function getCategoryIconByTitle(title: string, isSelected) {
	const size = 13
	const color = isSelected ? 'var(--color-primary-400)' : 'var(--color-grey-500)'

	switch (title) {
		case 'Liquid Staking':
			return <IconRipple size={size} color={color} />
		case 'Yield Aggregator':
			return <IconSeeding size={size} color={color} />
		case 'Yield':
			return <IconSeeding size={size} color={color} />
		case 'Dexes':
			return <IconLayoutGrid size={size} color={color} />
		case 'Lending':
			return <IconChartPie size={size} color={color} />
		case 'CDP':
			return <IconChartPie size={size} color={color} />
		case 'Leveraged Farming':
			return <IconChartPie size={size} color={color} />
		case 'Cross Chain':
			return <IconChartPie size={size} color={color} />
		case 'Derivatives':
			return <IconChartPie size={size} color={color} />
		default:
			return <IconSeeding size={size} color={color} />
	}
}
