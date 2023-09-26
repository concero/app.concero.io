import { IconArrowDown, IconArrowUp, IconCopy, IconExternalLink } from '@tabler/icons-react'
import { Modal } from '../../../modals/Modal/Modal'
import { Protocol } from '../types'
import classNames from './ProtocolModal.module.pcss'
import { Avatar } from '../../../tags/Avatar/Avatar'
import { CategoryTag } from '../../../tags/CategoryTag/CategoryTag'
import { Tag } from '../../../tags/Tag/Tag'
import { colors } from '../../../../constants/colors'
import { formatNumber } from '../../../../utils/formatting'
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
        <p className="body1">{period}</p>
      </div>
    </Tag>
  )
}

export function ProtocolModal({ show, setShow, protocol }: ProtocolModalProps) {
  if (!protocol) return null

  return (
    <Modal show={show} setShow={setShow} title="Protocol">
      <div className={classNames.container}>
        <div className={classNames.headerContainer}>
          <Avatar src={protocol.logoURI ?? null} size="lg" />
          <div>
            <div className={classNames.titleContainer}>
              <h4>{protocol.displayName ?? null}</h4>
              <p className="body1">{protocol.symbol}</p>
            </div>
            <p className="body1">{protocol.description}</p>
          </div>
        </div>
        <div className={classNames.tagsContainer}>
          {protocol.category && <CategoryTag category={protocol.category} />}
          {protocol.address && (
            <Tag color="grey" leftIcon={<IconCopy color={colors.text.secondary} size={16} />} onClick={() => copyInBuffer(protocol.address)}>
              <p className="body1">Contract address</p>
            </Tag>
          )}
          {protocol.url && (
            <Tag color="grey" leftIcon={<IconExternalLink color={colors.text.secondary} size={16} />} onClick={() => window.open(protocol.url, '_blank')}>
              <p className="body1">Website</p>
            </Tag>
          )}
        </div>
        {protocol.totalAllTime && <TransactionTotal protocol={protocol} />}
        {protocol.dailySupplySideRevenue && protocol.dailyFees && <DailyInfo protocol={protocol} />}
        {protocol.audit_links.length > 0 && <AuditLinks auditLinks={protocol.audit_links} />}
      </div>
    </Modal>
  )
}

function TransactionTotal({ protocol }: { protocol: Protocol }) {
  return (
    <div className={`card ${classNames.totalContainer} ${classNames.cardContainer}`}>
      <div className={classNames.priceContainer}>
        <h4 className="body1">Transactions total</h4>
        <h3>${formatNumber(protocol.totalAllTime)}</h3>
      </div>
      <div className={classNames.rowContainer}>
        <ChangeTag change={protocol.change_7d} period="This week" />
        <ChangeTag change={protocol.change_1m} period="This month" />
      </div>
    </div>
  )
}

function DailyInfo({ protocol }: { protocol: Protocol }) {
  return (
    <div className={classNames.dailyContainer}>
      <InfoCard title="Daily fees" value={formatNumber(protocol.dailyFees)} />
      <InfoCard title="Daily supply revenue" value={formatNumber(protocol.dailySupplySideRevenue)} />
    </div>
  )
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className={`card ${classNames.priceContainer} ${classNames.cardContainer}`}>
      <p className="body1">{title}</p>
      <h3>${value}</h3>
    </div>
  )
}

function AuditLinks({ auditLinks }: { auditLinks: string[] }) {
  return (
    <div className={`card ${classNames.cardContainer}`}>
      <p className="body1">Audits</p>
      <div className={classNames.tagsContainer}>
        {auditLinks.map((link, index) => (
          <Tag key={index} color="grey" leftIcon={<IconExternalLink color={colors.text.secondary} size={16} />} onClick={() => window.open(link, '_blank')}>
            <p className="body1">Github</p>
          </Tag>
        ))}
      </div>
    </div>
  )
}
