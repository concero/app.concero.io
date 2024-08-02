import { Card } from '../Card/Card'
import { Button } from '../../buttons/Button/Button'
import { IconExternalLink } from '@tabler/icons-react'
import classNames from './LinksCard.module.pcss'

interface Link {
	title: string
	url: string
}

interface ExternalLinkProps {
	link: Link
}

const auditsLinks: Link[] = [
	{
		title: 'Dedaub',
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

export const LinksCard = () => {
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
