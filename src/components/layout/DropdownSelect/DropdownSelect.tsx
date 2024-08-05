import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { Card } from '../../cards/Card/Card'
import { Button } from '../../buttons/Button/Button'
import { IconChevronDown } from '@tabler/icons-react'
import classNames from './DropdownSelect.module.pcss'
import { useSpring, animated } from '@react-spring/web'
import { type SelectItem } from '../../../utils/chartTimeFilters'

export interface DropdownSelectProps {
	items: SelectItem[]
	activeItem: SelectItem
	setActiveItem: (item: Dispatch<SetStateAction<SelectItem>>) => void
	variant?: 'fill' | 'simple'
}

export default function Dropdown({ activeItem, setActiveItem, items, variant = 'fill' }: DropdownSelectProps) {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		document.addEventListener('click', () => {
			setIsOpen(false)
		})

		return () => {
			document.removeEventListener('click', () => {
				setIsOpen(false)
			})
		}
	}, [])

	const fadeAnimation = useSpring({
		opacity: isOpen ? 1 : 0,
		translateY: isOpen ? 0 : -20,
		zIndex: 3,
		config: { mass: 1, tension: 600, friction: 30 },
		pointerEvents: isOpen ? 'auto' : 'none',
		from: { opacity: 0, pointerEvents: 'none' },
	})

	const toggleOptions = e => {
		e.stopPropagation()
		setIsOpen(prev => !prev)
	}

	const selectOption = (option: SelectItem) => {
		setActiveItem(option)
		setIsOpen(false)
	}

	return (
		<div className={classNames.dropdownSelect}>
			<Button
				variant="convex"
				size="sm"
				onClick={toggleOptions}
				className={variant === 'fill' ? classNames.dropdownButton : classNames.dropdownButtonSimple}
				rightIcon={<IconChevronDown size={16} color={'var(--color-text-secondary)'} />}
			>
				<span className="body4">{activeItem.title}</span>
			</Button>
			<animated.div style={fadeAnimation}>
				<Card className={`cardConvex ${classNames.selectOptions}`}>
					{items.map(item => {
						return (
							<Button
								key={item.title}
								variant="black"
								onClick={() => {
									selectOption(item)
								}}
							>
								<span className="body4">{item.title}</span>
							</Button>
						)
					})}
				</Card>
			</animated.div>
		</div>
	)
}
