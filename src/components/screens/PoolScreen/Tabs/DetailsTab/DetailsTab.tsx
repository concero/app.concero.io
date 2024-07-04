import { IconExternalLink } from '@tabler/icons-react'
import { Button } from '../../../../buttons/Button/Button'
import { BarChartCard } from '../../../../cards/BarChartCard/BarChartCard'
import { Card } from '../../../../cards/Card/Card'
import classNames from './DetailsTab.module.pcss'
import { LineChartCard } from '../../../../cards/LineChartCard/LineChartCard'
import Dropdown from '../../../../layout/DropdownSelect/DropdownSelect'
import { timeFilters } from '../../../../../constants/timeFilters'

interface Link {
	title: string
	url: string
}

interface ExternalLinkProps {
	link: Link
}

const auditsLinks: Link[] = [
	{
		title: 'Deadub',
		url: 'https://dedaub.com',
	},
	{
		title: 'TrailOfBits',
		url: 'https://www.trailofbits.com',
	},
]

const resorcesLinks: Link[] = [
	{
		title: 'Source code',
		url: 'https://dedaub.com',
	},
	{
		title: 'Whitepaper',
		url: 'https://www.trailofbits.com',
	},
	{
		title: 'Twitter',
		url: 'https://twitter.com/concero_io',
	},
	{
		title: 'Discord',
		url: 'https://discord.com/channels/1155792755105214535',
	},
]

const ExternalLink = ({ link }: ExternalLinkProps) => {
	return (
		<a href={link.url} target="_blank" rel="noopener noreferrer">
			<Button
				className={classNames.link}
				variant="convex"
				size="sm"
				rightIcon={<IconExternalLink size={16} color={'var(--color-text-secondary)'} />}
			>
				{link.title}
			</Button>
		</a>
	)
}

const TotalVolumeCard = () => {
	return (
		<LineChartCard
			className={classNames.totalVolumeCard}
			filterItems={timeFilters}
			activeItem={timeFilters[0]}
			setActiveItem={() => {}}
			titleCard="Total Volume"
			commonValue="1.5M USDC"
		/>
	)
}

const LinksCard = () => {
	return (
		<Card className={`${classNames.linksCard} cardConvex`}>
			<span className="body4">Audits</span>

			<div className={classNames.linksList}>
				{auditsLinks.map(link => (
					<ExternalLink link={link} />
				))}
			</div>

			<span className={classNames.separator} />

			<span className="body4">Resources</span>

			<div className={classNames.linksList}>
				{resorcesLinks.map(link => (
					<ExternalLink link={link} />
				))}
			</div>
		</Card>
	)
}

const TotalFeesCard = () => {
	return (
		<Card className="cardConvex">
			<div className="row jsb w-full">
				<div className="gap-sm">
					<h4 className="body4">Total fees</h4>
					<h2>$15,000 USDC</h2>
				</div>
				<Dropdown setActiveItem={() => {}} activeItem={timeFilters[0]} items={timeFilters} />
			</div>
		</Card>
	)
}

const TotalTransactionCard = () => {
	return (
		<Card className="cardConvex f1">
			<div className="row jsb w-full">
				<div className="gap-sm">
					<h4 className="body4">Total Transactions</h4>
					<h2>1 500 953</h2>
				</div>
				<Dropdown variant="simple" setActiveItem={() => {}} activeItem={timeFilters[0]} items={timeFilters} />
			</div>
		</Card>
	)
}

export const DetailsTab = () => {
	return (
		<div className={classNames.details}>
			<div className={classNames.totalInfoSection}>
				<TotalVolumeCard />
				<div className="f1 gap-md">
					<TotalFeesCard />
					<TotalTransactionCard />
				</div>
			</div>
			<div className={classNames.restInfoSection}>
				<BarChartCard titleCard="Volume by chain" />
				<LinksCard />
			</div>
		</div>
	)
}
