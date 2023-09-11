import { X } from 'tabler-icons-react'
import classNames from './Modal.module.pcss'
import { Button } from '../../buttons/Button/Button'

export function ModalHeader(props: { title: string; onClick: () => void }) {
  return (
    <div className={classNames.header}>
      <h5>{props.title}</h5>
      <Button onClick={props.onClick} variant="black" size="sq-xs" leftIcon={<X size={18} color="var(--color-text-secondary)" />} />
    </div>
  )
}
