import { FooterLogo } from '../../../assets/icons/FooterLogo'
import { Button } from '../../buttons/Button/Button'
import classNames from './Footer.module.pcss'
import { type ReactNode } from 'react'
import { TwitterIcon } from '../../../assets/icons/Socials/TwitterIcon'
import { DiscordIcon } from '../../../assets/icons/Socials/DiscordIcon'
import { MediumIcon } from '../../../assets/icons/Socials/MediumIcon'
import { Link } from 'react-router-dom'
import { routes } from '../../../constants/routes'

interface SocialIconWrapProps {
	children: ReactNode
	variant: 'iconBlue' | 'iconDark'
	href: string
}

const SocialIconWrap = ({ children, variant, href }: SocialIconWrapProps) => {
	return (
		<a
			target="_blank"
			href={href}
			className={`${classNames.socialIconWrap} ${classNames[variant]}`}
			rel="noreferrer"
		>
			{children}
		</a>
	)
}

export const Footer = () => {
	return (
		<footer className={classNames.footer}>
			<div className={classNames.logoWrap}>
				<FooterLogo />
			</div>
			<div className="w-full jsb row wrap gap-xl">
				<div>
					<h5 className={classNames.title}>Build the nex big thing</h5>
					<p className={`${classNames.subtitle} body2`}>Contact us to learn the benefits</p>
					<Button size="sm" variant="secondaryColor">
						Contact us
					</Button>
				</div>

				<div className="row gap-lg">
					<div className="row gap-lg">
						<div className={classNames.linkGroup}>
							<p className="body2">Documentation:</p>
							<Button className={classNames.link} variant="tetrary" size="md">
								Documentation
							</Button>
							<Button className={classNames.link} variant="tetrary" size="md">
								White paper
							</Button>
						</div>

						<div className={classNames.linkGroup}>
							<p className="body2">Earn:</p>
							<Link to={routes.pool}>
								<Button className={classNames.link} variant="tetrary" size="md">
									Provide Liquidity
								</Button>
							</Link>

							<Link to={routes.rewards}>
								<Button className={classNames.link} variant="tetrary" size="md">
									Rewards Portal
								</Button>
							</Link>
						</div>
					</div>

					<div className={classNames.linkGroup}>
						<p className="body2">Socials:</p>
						<div className="row gap-sm">
							<SocialIconWrap href="https://x.com/concero_io" variant="iconDark">
								<TwitterIcon />
							</SocialIconWrap>
							<SocialIconWrap href="https://discord.com/channels/1155792755105214535" variant="iconBlue">
								<DiscordIcon />
							</SocialIconWrap>
							<SocialIconWrap href="https://medium.com/@concero" variant="iconDark">
								<MediumIcon />
							</SocialIconWrap>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
