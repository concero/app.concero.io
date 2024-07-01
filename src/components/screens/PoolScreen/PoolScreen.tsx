import { useState } from 'react'
import classNames from './PoolScreen.module.pcss'
import { TabBar, type TabItem } from '../../layout/tabBar/TabBar'

import { ManageTab } from './Tabs/ManageTab/ManageTab'
import { DetailsTab } from './Tabs/DetailsTab/DetailsTab'
import { EarningsTab } from './Tabs/EarningsTab/EarningsTab'

const menuItems: TabItem[] = [
	{
		title: 'Manage',
		value: 'manage',
		component: <ManageTab />,
	},
	{
		title: 'Earnings',
		value: 'earnings',
		component: <EarningsTab />,
	},
	{
		title: 'Details',
		value: 'details',
		component: <DetailsTab />,
	},
]

export const PoolScreen = () => {
	const [activeTab, setActiveTab] = useState<TabItem>(menuItems[0])

	const changeTab = (tab: TabItem) => {
		setActiveTab(tab)
	}

	return (
		<div className={classNames.poolWrapper}>
			<div className={classNames.poolContainer}>{activeTab.component}</div>
			<TabBar items={menuItems} changeTab={changeTab} activeTab={activeTab} />
		</div>
	)
}
