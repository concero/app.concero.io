import { Avatar } from '../../tags/Avatar/Avatar'
import classNames from './TokenIcon.module.pcss'

interface TokenIconProps {
	tokenLogoSrc: string
	chainLogoSrc: string
}

export function TokenIcon({ tokenLogoSrc, chainLogoSrc }: TokenIconProps) {
	return (
		<div className={classNames.tokenImageContainer}>
			<Avatar src={tokenLogoSrc} />
			<Avatar src={chainLogoSrc} className={classNames.chainLogo} size={'sm'} />
		</div>
	)
}
