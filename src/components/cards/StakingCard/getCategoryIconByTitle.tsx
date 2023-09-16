import { IconChartPie, IconDroplet, IconLayoutGrid, IconRipple, IconSeeding } from '@tabler/icons-react'
import { colors } from '../../../constants/colors'

export function getCategoryIconByTitle(title: string) {
  const size = 13
  const color = colors.text.secondary

  switch (title) {
    case 'Liquid Staking':
      return <IconRipple size={size} color={color} />
    case 'Yield':
      return <IconSeeding size={size} color={color} />
    case 'LP':
      return <IconDroplet size={size} color={color} />
    case 'DEX':
      return <IconLayoutGrid size={size} color={color} />
    case 'Lending':
      return <IconChartPie size={size} color={color} />
    default:
      return <IconSeeding size={size} color={color} />
  }
}
