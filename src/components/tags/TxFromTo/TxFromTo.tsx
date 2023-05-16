import { FC } from 'react'
import Icon from '../../Icon'
import className from './TxFromTo.module.pcss'
import { colors } from '../../../constants/colors'

// todo: add chain icons component
export interface TxFromToProps {
  from: string
  to: string
  showIcons?: boolean
  color?: string
}

export const TxFromTo: FC<TxFromToProps> = ({ item }) => {
  const { from, to, showIcons, type } = item
  const color = getColor(type)

  const styles = {
    text: {
      color,
    },
  }

  return (
    <div className={className.container}>
      <p style={styles.text}>{from}</p>
      <Icon name="ArrowRight" color={color} size={18} />
      <p style={styles.text}>{to}</p>
    </div>
  )
}
const getColor = (type: string) => {
  switch (type) {
    case 'sell':
      return colors.red.dark
    case 'buy':
      return colors.green.dark
    default:
      return colors.text.primary
  }
}
