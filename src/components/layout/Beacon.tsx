import { FC } from 'react'
import classNames from './Beacon.module.pcss'

export interface BeaconProps {
  isOn: boolean
}

export const Beacon: FC<BeaconProps> = ({ isOn }) => {
  const beacon = `${classNames.beacon} ${isOn ? classNames.on : ''}`
  return (
    <div className={classNames.container}>
      <div className={beacon} />
    </div>
  )
}
