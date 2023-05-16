import { FC, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader.tsx'
import { Button } from '../../buttons/Button/Button.tsx'
import classNames from './SwapCard.module.pcss'
import { Modal } from '../../layout/Modal/Modal.tsx'

interface SwapCardProps {}

export const SwapCard: FC<SwapCardProps> = () => {
  const [showChainsModal, setShowChainsModal] = useState<boolean>(false)
  return (
    <>
      <div className="card">
        <CardHeader title={'Swap'}></CardHeader>

        <div className={classNames.swapContainer}>
          <div className={classNames.tokenContainer}>
            <div className={classNames.tokenRow}>
              <div className={classNames.tokenRowHeader}>
                <p>From</p>
                <Button
                  onClick={() => setShowChainsModal(true)}
                  size={'sm'}
                  variant={'black'}
                  rightIcon={{ name: 'ChevronDown', iconProps: { size: 18 } }}>
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
            </div>
          </div>
          <div className={classNames.tokenContainer}>
            <div className={classNames.tokenRow}>
              <div className={classNames.tokenRowHeader}>
                <p>To</p>
                <Button size={'sm'} variant={'black'} rightIcon={{ name: 'ChevronDown', iconProps: { size: 18 } }}>
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
            </div>
          </div>

          <Button size={'lg'} leftIcon={{ name: 'ArrowsUpDown', iconProps: { size: 18 } }}>
            Swap
          </Button>
        </div>
      </div>
      <Modal
        title={'Choose chain'}
        show={showChainsModal}
        setShow={setShowChainsModal}
        size={{ height: 400, width: 400 }}
      />
    </>
  )
}
