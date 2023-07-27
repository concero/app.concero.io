import { FC } from 'react'
import Icon from '../../Icon'
import className from './TxFromTo.module.pcss'
import { colors } from '../../../constants/colors'

// todo: add chain icons component
export interface TxFromToProps {
  item: {
    from: {
      amount: string
      symbol: string
    }
    to: {
      amount: string
      symbol: string
    }
    type: string
  }
}

export const TxFromTo: FC<TxFromToProps> = ({ item }) => {
  const { from, to, type } = item

  const color = getColor(type)

  const styles = {
    text: {
      color,
    },
  }

  return (
    <div className={className.container}>
      <p style={styles.text}>{from.amount}</p>
      <p style={styles.text}>{from.symbol}</p>
      <Icon name={type === 'sell' ? 'ArrowRight' : 'ArrowLeft'} color={color} size={18} />
      <p style={styles.text}>{to.amount}</p>
      <p style={styles.text}>{to.symbol}</p>
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
