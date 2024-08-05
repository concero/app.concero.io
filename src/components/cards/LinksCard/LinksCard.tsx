import { Card } from '../Card/Card'
import { Button } from '../../buttons/Button/Button'
import { IconExternalLink } from '@tabler/icons-react'
import classNames from './LinksCard.module.pcss'

interface Link {
	title: string
	url: string
	isDisable: boolean
}

interface ExternalLinkProps {
	link: Link
}

const auditsLinks: Link[] = [
	{
		title: 'Dedaub',
		url: 'https://dedaub.com',
		isDisable: true,
	},
	{
		title: 'TrailOfBits',
		url: 'https://www.trailofbits.com',
		isDisable: true,
	},
]

const resorcesLinks: Link[] = [
	{
		title: 'Source code',
		url: 'https://github.com/concero/contracts-ccip',
		isDisable: false,
	},
	{
		title: 'Whitepaper',
		url: 'https://www.trailofbits.com',
		isDisable: true,
	},
	{
		title: 'Twitter',
		url: 'https://twitter.com/concero_io',
		isDisable: false,
	},
	{
		title: 'Discord',
		url: 'https://discord.com/channels/1155792755105214535',
		isDisable: false,
	},
]

const ExternalLink = ({ link }: ExternalLinkProps) => {
	const button = (
		<Button
			isDisabled={link.isDisable}
			className={classNames.link}
			variant="convex"
			size="sm"
			rightIcon={<IconExternalLink size={16} color={'var(--color-text-secondary)'} />}
		>
			{link.title}
		</Button>
	)
	if (link.isDisable) {
		return button
	}

	return (
		<a href={link.url} target="_blank" rel="noopener noreferrer">
			{button}
		</a>
	)
}

export const LinksCard = () => {
	return (
		<Card className={`${classNames.linksCard} cardConvex`}>
			<span className="body4">Audits</span>

			<div className={classNames.linksList}>
				{auditsLinks.map(link => (
					<ExternalLink key={link.title} link={link} />
				))}
			</div>

			<span className={classNames.separator} />

			<span className="body4">Resources</span>

			<div className={classNames.linksList}>
				{resorcesLinks.map(link => (
					<ExternalLink key={link.title} link={link} />
				))}
			</div>
		</Card>
	)
}
