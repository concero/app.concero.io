import { FC } from 'react'
import { CardHeader } from './CardHeader'
import { Button } from '../buttons/Button/Button'
import classNames from './SwapCard.module.pcss'

interface SwapCardProps {}

export const SwapCard: FC<SwapCardProps> = () => {
  return (
    <div className="card">
      <CardHeader title={'Swap'}></CardHeader>

      <div className={classNames.swapContainer}>
        <div className={classNames.tokenContainer}>
          <div className={classNames.tokenRow}>
            <p>From</p>
            <Button sm subtle>
              BNB
            </Button>
            <p>Max: 10</p>
          </div>
          <div className={classNames.tokenRow}>
            <div>
              <h3>40 BNB</h3>
              <h5>$4024</h5>
            </div>
          </div>
        </div>
        <div className={classNames.tokenContainer}>
          <div className={classNames.tokenRow}>
            <p>To</p>
            <p>Max: 10</p>
          </div>
          <div className={classNames.tokenRow}>
            <div>
              <h3>40 BNB</h3>
              <h5>$4024</h5>
            </div>
          </div>
        </div>

        <Button primary lg leftIcon={{ name: 'ArrowsUpDown', iconProps: { size: 18 } }}>
          Swap
        </Button>
      </div>
    </div>
  )
}
