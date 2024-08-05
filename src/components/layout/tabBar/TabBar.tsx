import { type ReactNode } from 'react'
import classNames from './TabBar.module.pcss'

export interface TabItem {
	title: string
	value: string
	component?: ReactNode
}

export interface NavbarProps {
	items: TabItem[]
	changeTab: (tab: TabItem) => void
	activeTab: TabItem
}

export const TabBar = ({ items, changeTab, activeTab }: NavbarProps) => {
	return (
		<div className={classNames.tabBarContainer}>
			{items.map(item => {
				const isActive = item.value === activeTab.value
				const activeClass = isActive ? classNames.menuItemActive : ''

				return (
					<button
						key={item.title}
						className={`${classNames.menuItem} ${activeClass}`}
						onClick={() => {
							changeTab(item)
						}}
					>
						{item.title}
						<div className={classNames.line} />
					</button>
				)
			})}
		</div>
	)
}
