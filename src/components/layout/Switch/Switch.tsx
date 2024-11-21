import classNames from './Switch.module.pcss'

interface Props {
	active: boolean
	setActive?: () => void
}

export const Switch = ({ active, setActive }: Props) => {
	const activeClass = active ? classNames.active : ''

	return (
		<div onClick={setActive} className={`${classNames.wrapper} ${activeClass}`}>
			<div></div>
		</div>
	)
}
