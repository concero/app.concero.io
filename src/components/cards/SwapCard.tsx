import { FC } from 'react'
import { CardHeader } from './CardHeader'
import { Button } from '../buttons/Button/Button'
import { Tag } from '../tags/Tag'
import { colors } from '../../constants/colors'

interface SwapCardProps {}

export const SwapCard: FC<SwapCardProps> = () => {
  return (
    <div className="card">
      <CardHeader title={'Swap'}></CardHeader>
      <Button primary lg leftIcon={{ name: 'ArrowsUpDown', iconProps: { size: 18 } }}>
        Swap
      </Button>
      <Tag
        sm
        primary
        fgColor={colors.green.main}
        bgColor={colors.green.darkest}
        leftIcon={{ name: 'ArrowUpRight', iconProps: { size: 18 } }}>
        +50%
      </Tag>
    </div>
  )
}
