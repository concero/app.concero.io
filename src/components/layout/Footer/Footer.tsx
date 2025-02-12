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
					<h5 className={classNames.title}>Build the next big thing</h5>
					<p className={`${classNames.subtitle} body2`}>Contact us to learn the benefits</p>
					<a href="mailto:concerocrypto@gmail.com">
						<Button size="sm" variant="secondaryColor">
							Contact us
						</Button>
					</a>
				</div>

				<div className={classNames.navigation}>
					<div className={classNames.navigationLeft}>
						<div className={classNames.linkGroup}>
							<p className="body2">Integrate:</p>
							<a target="_blank" rel="noreferrer" href="https://docs.concero.io">
								<Button className={classNames.link} variant="tetrary" size="md">
									Documentation
								</Button>
							</a>
							<a target="_blank" rel="noreferrer" href="https://www.concero.io/whitepaper.pdf">
								<Button className={classNames.link} variant="tetrary" size="md">
									White paper
								</Button>
							</a>
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
							<SocialIconWrap href="http://discord.gg/lanca" variant="iconBlue">
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
