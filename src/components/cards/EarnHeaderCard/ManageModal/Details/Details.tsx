import { IconGasStation } from '@tabler/icons-react'
import { type ManageState } from '../useEarnReducer/types'
import classNames from './Details.module.pcss'
import { Avatar } from '../../../../tags/Avatar/Avatar'
import { Tag } from '../../../../tags/Tag/Tag'
import { numberToFormatString, roundNumberByDecimals } from '../../../../../utils/formatting'
import BigNumber from 'bignumber.js'
import { type ReactElement } from 'react'

interface DetailsProps {
	manageState: ManageState
}

export function Details({ manageState }: DetailsProps): ReactElement {
	const rate = roundNumberByDecimals(new BigNumber(manageState.to.amount).div(manageState.from.amount).toString())

	return (
		<div className={`${classNames.container} ${!manageState.route ? classNames.hidden : ''}`}>
			<Tag>
				<p className="body1">1</p>
				<Avatar src={manageState?.from.token.logoURI} size="sm" />
				<p className="body1">=</p>
				<p className="body1">{rate}</p>
				<Avatar src={manageState?.to.token.logoURI} size="sm" />
			</Tag>
			<Tag color="grey">
				<div className={classNames.tagContainer}>
					{manageState?.route?.gasUsd ? (
						<div className={classNames.tagInnerContainer}>
							<IconGasStation color={'var(--color-text-secondary)'} size={16} />
							<p className="body1">${numberToFormatString(Number(manageState.route.gasUsd), 4, true)}</p>
						</div>
					) : null}
					{/* {manageState?.route?.expectedSlippage ? ( */}
					{/* 	<div className={classNames.tagInnerContainer}> */}
					{/* 		<IconArrowWaveRightUp size={16} color={'var(--color-text-secondary)'} /> */}
					{/* 		<p className="body1">{numberToFormatString(parseFloat(manageState?.route.), 4)}%</p> */}
					{/* 	</div> */}
					{/* ) : null} */}
				</div>
			</Tag>
		</div>
	)
}
