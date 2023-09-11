import { FC } from 'react'
import { ArrowLeft, ArrowRight } from 'tabler-icons-react'
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

export const TxFromTo: FC<TxFromToProps> = ({ from, to, type }) => {
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
      {type === 'sell' ? <ArrowRight size={18} color={color} /> : <ArrowLeft size={18} color={color} />}
      <p style={styles.text}>{to.amount}</p>
      <p style={styles.text}>{to.symbol}</p>
    </div>
  )
}
const getColor = (type: string) => {
  switch (type) {
    case 'sell':
      return colors.green.dark
    case 'buy':
      return colors.red.dark
    default:
      return colors.text.primary
  }
}
