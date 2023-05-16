import classNames from './SwapCard.module.pcss'
import { Button } from '../../buttons/Button/Button'

export function TokenArea({ title, onSelectChain, onSelectToken }) {
  return (
    <div className={classNames.tokenContainer}>
      <div className={classNames.tokenRow}>
        <div className={classNames.tokenRowHeader}>
          <p>{title}</p>
          <Button
            onClick={onSelectChain}
            size="sm"
            variant="black"
            rightIcon={{ name: 'ChevronDown', iconProps: { size: 18 } }}
          >
            BNB
          </Button>
        </div>
        <p>Max: 10</p>
      </div>
      <div className={classNames.tokenRow}>
        <div>
          <h3>40 BNB</h3>
          <h5>$4024</h5>
        </div>
        <Button
          onClick={onSelectToken}
          size="sm"
          variant="black"
          rightIcon={{ name: 'ChevronDown', iconProps: { size: 18 } }}
        >
          BNB
        </Button>
      </div>
    </div>
  )
}
