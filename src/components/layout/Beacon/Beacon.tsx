import { type FC } from 'react'
import classNames from './Beacon.module.pcss'

export interface BeaconProps {
	isOn: boolean
	color: 'red' | 'green' | 'primary'
}

export const Beacon: FC<BeaconProps> = ({ isOn, color }) => {
	const beaconClassName = color => {
		switch (color) {
			case 'red':
				return classNames.red
			case 'green':
				return classNames.green
			default:
				return classNames.primary
		}
	}
	return (
		<div className={classNames.container}>
			<div className={`${classNames.beacon} ${isOn && beaconClassName(color)}`} />
		</div>
	)
}
