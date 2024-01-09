import { type FC, type ReactNode } from 'react'
import styles from './MenuPopover.module.pcss'

export interface MenuItem {
	title: string
	icon: ReactNode
	onClick?: () => void
}

export interface MenuPopoverProps {
	items: MenuItem[]
}

export const MenuPopover: FC<MenuPopoverProps> = ({ items }) => (
	<div className={styles.container}>
		{items.map((item, index) => (
			<div
				key={index}
				className={styles.menuItem}
				onClick={() => {
					item.onClick && item.onClick()
				}}
			>
				{item.icon ? item.icon : null}
				<span className={styles.title} style={item.danger ? { color: 'var(--color-red-500)' } : {}}>
					{item.title}
				</span>
			</div>
		))}
	</div>
)
