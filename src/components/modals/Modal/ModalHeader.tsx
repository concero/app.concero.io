import classNames from './Modal.module.pcss'
import { Button } from '../../buttons/Button/Button'

export function ModalHeader(props: { title: string; onClick: () => void }) {
  return (
    <div className={classNames.header}>
      <h5>{props.title}</h5>
      <Button
        onClick={props.onClick}
        variant="black"
        size="sq-xs"
        leftIcon={{ name: 'X', iconProps: { size: 18 } }}
      />
    </div>
  )
}
