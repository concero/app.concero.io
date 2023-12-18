import { IconCheck } from '@tabler/icons-react'
import classNames from './RowComponent.module.pcss'
import { Button } from '../../../buttons/Button/Button'

export function RowComponent({ item, isSelected, onSelect }: any) {
	const { title } = item
	return (
		<Button variant={isSelected ? 'primary' : 'black'} onClick={() => onSelect(item)}>
			<div className={classNames.container}>{title}</div>
			<div>{isSelected ? <IconCheck size={16} /> : null}</div>
		</Button>
	)
}
