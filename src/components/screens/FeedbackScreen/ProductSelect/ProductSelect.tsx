import { useState, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { IconChevronDown } from '@tabler/icons-react'
import classNames from './ProductSelect.module.pcss'

export interface ProductSelectProps {
	products: Array<{ title: string }>
	activeItem: { title: string }
	setActiveItem: (item: { title: string }) => void
}

export default function ProductSelect({ products, activeItem, setActiveItem }: ProductSelectProps) {
	const [isOpen, setIsOpen] = useState(false)

	const fadeAnimation = useSpring({
		opacity: isOpen ? 1 : 0,
		transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
		pointerEvents: isOpen ? 'auto' : 'none',
	})

	const selectAnimation = useSpring({
		transform: 'translateX(0)',
		from: { transform: 'translateX(-5px)' },
		config: { tension: 170, friction: 12, clamp: true },
	})

	const toggleOptions = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsOpen(prev => !prev)
	}

	const selectOption = (product: { title: string }) => {
		setActiveItem(product)
		setIsOpen(false)
	}

	useEffect(() => {
		const handleClickOutside = () => {
			setIsOpen(false)
		}
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	return (
		<div className={classNames.dropdownSelect}>
			<button type="button" onClick={toggleOptions} className={classNames.dropdownButton}>
				<span>{activeItem.title}</span>
				<IconChevronDown size={16} className={classNames.chevronIcon} />
			</button>
			<animated.div style={fadeAnimation} className={classNames.selectOptionsContainer}>
				{isOpen && (
					<div className={classNames.selectOptions}>
						{products.map(product => (
							<animated.button
								key={product.title}
								type="button"
								onClick={() => {
									selectOption(product)
								}}
								className={classNames.selectOptionButton}
								style={selectAnimation}
							>
								{product.title}
							</animated.button>
						))}
					</div>
				)}
			</animated.div>
		</div>
	)
}
