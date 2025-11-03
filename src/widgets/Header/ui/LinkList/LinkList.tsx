import { Link, useMatch } from 'react-router-dom'
import { NavButton } from '@/shared/ui'
import { routes } from '@/shared/consts/routing/routes'
import cls from './LinkList.module.pcss'

type TProps = {
	className?: string
}

export const LinkList = (props: TProps) => {
	const { className } = props
	const isQuestsPage = useMatch(routes.quests)
	const isTestingPage = useMatch(routes.testing)
	return (
		<nav className={className}>
			<ul style={{ width: '100%' }}>
				<Link style={{ pointerEvents: isQuestsPage ? 'none' : 'all' }} to={routes.quests}>
					<NavButton active={Boolean(isQuestsPage)} text="Quests" />
				</Link>
				<Link style={{ pointerEvents: isTestingPage ? 'none' : 'all' }} to={routes.testing}>
					<NavButton active={Boolean(isTestingPage)} text="Testing" />
				</Link>
			</ul>
		</nav>
	)
}
