import { IconArrowDown, IconArrowUp, IconCopy, IconExternalLink } from '@tabler/icons-react'
import { Modal } from '../../../modals/Modal/Modal'
import { Protocol } from '../types'
import classNames from './ProtocolModal.module.pcss'
import { Avatar } from '../../../tags/Avatar/Avatar'
import { CategoryTag } from '../../../tags/CategoryTag/CategoryTag'
import { Tag } from '../../../tags/Tag/Tag'
import { colors } from '../../../../constants/colors'
import { numberToFormatString } from '../../../../utils/formatting'
import { copyInBuffer } from '../../../../utils/copyInBuffer'

interface ProtocolModalProps {
  show: boolean
  setShow: (show: boolean) => void
  protocol: Protocol
}

function ChangeTag({ change, period }: { change: number; period: string }) {
  const isDown = change < 0
  return (
    <Tag color={isDown ? 'red' : 'green'}>
      <div className={isDown ? classNames.red : classNames.green}>
        <div style={{ flexDirection: 'row', alignItems: 'center' }}>
          {isDown ? <IconArrowDown size={16} color={colors.red.dark} /> : <IconArrowUp size={16} color={colors.green.main} />}
          <h4>{Math.abs(change)}%</h4>
        </div>
        <p className={'body1'}>{period}</p>
      </div>
    </Tag>
  )
}

export function ProtocolModal({ show, setShow, protocol }: ProtocolModalProps) {
  return (
    <Modal show={show} setShow={setShow} title={'Protocol'}>
      {protocol ? (
        <div className={classNames.container}>
          <div className={classNames.headerContainer}>
            <Avatar src={protocol.logoURI ?? null} size={'lg'} />
            <div>
              <div className={classNames.titleContainer}>
                <h4>{protocol.displayName}</h4>
                <p className={'body1'}>{protocol.symbol}</p>
              </div>
              <p className={'body1'}>{protocol.description}</p>
            </div>
          </div>
          <div className={classNames.tagsContainer}>
            {protocol.category ? <CategoryTag category={protocol.category} /> : null}
            {protocol.address ? (
              <Tag color={'grey'} leftIcon={<IconCopy color={colors.text.secondary} size={16} />} onClick={() => copyInBuffer(protocol.address)}>
                <p className="body1">Contract address</p>
              </Tag>
            ) : null}
            {protocol.url ? (
              <Tag color={'grey'} onClick={() => window.open(protocol.url, '_blank')} leftIcon={<IconExternalLink color={colors.text.secondary} size={16} />}>
                <p className="body1">Website</p>
              </Tag>
            ) : null}
          </div>
          {protocol.totalAllTime ? (
            <div className={`card ${classNames.totalContainer} ${classNames.cardContainer}`}>
              <div className={classNames.priceContainer}>
                <h4 className={'body1'}>Transactions total</h4>
                <h3>${numberToFormatString(protocol.totalAllTime, 2)}</h3>
              </div>
              <div className={classNames.rowContainer}>
                <ChangeTag change={protocol.change_7d} period={'This week'} />
                <ChangeTag change={protocol.change_1m} period={'This month'} />
              </div>
            </div>
          ) : null}
          {protocol.dailySupplySideRevenue && protocol.dailyFees ? (
            <div className={classNames.dailyContainer}>
              {protocol.dailyFees ? (
                <div className={`card ${classNames.priceContainer} ${classNames.cardContainer}`}>
                  <p className={'body1'}>Daily fees</p>
                  <h3>${numberToFormatString(protocol.dailyFees, 2)}</h3>
                </div>
              ) : null}
              {protocol.dailySupplySideRevenue ? (
                <div className={`card ${classNames.priceContainer} ${classNames.cardContainer}`}>
                  <p className={'body1'}>Daily supply revenue</p>
                  <h3>${numberToFormatString(protocol.dailySupplySideRevenue, 2)}</h3>
                </div>
              ) : null}
            </div>
          ) : null}
          {protocol.audit_links.length ? (
            <div className={`card ${classNames.cardContainer}`}>
              <p className={'body1'}>Audits</p>
              {protocol.audit_links.map((link) => {
                return (
                  <Tag color={'grey'} onClick={() => window.open(link, '_blank')} leftIcon={<IconExternalLink color={colors.text.secondary} size={16} />}>
                    <p className={'body1'}>Github</p>
                  </Tag>
                )
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </Modal>
  )
}
