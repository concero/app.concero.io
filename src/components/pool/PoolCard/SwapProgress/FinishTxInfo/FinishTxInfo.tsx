import type { SwapStateDirection } from '../../swapReducer/types'
import { SelectTokenShape } from '../../TokenArea/SelectTokenShape/SelectTokenShape'
import { Badge } from '../../../../layout/Badge/Badge'
import classNames from './FinishTxInfo.module.pcss'
import { Separator } from '../../../../layout/Separator/Separator'
import { Alert } from '../../../../layout/Alert/Alert'

interface Props {
	to: SwapStateDirection
	isDeposit: boolean
}

export const FinishTxInfo = ({ to, isDeposit }: Props) => {
	return (
		<div className="gap-lg jc ac w-full">
			<img src="/Success.png" width={128} height={128} />

			<div className="gap-sm ac">
				<p className={classNames.title}>You {isDeposit ? 'Deposited' : 'Withdrawal'}</p>

				<div className="row gap-sm ac">
					<h2 className={classNames.title}>{Number(to.amount).toFixed(3)}</h2>
					<div className="row gap-xs ac">
						<Badge size="l" tokenLogoSrc={to.token.logoURI} chainLogoSrc={to.chain.logoURI} />
						<SelectTokenShape symbol={to.token.symbol} chainName={to.chain.name} />
					</div>
				</div>
			</div>

			<Separator />
			<Alert
				variant="neutral"
				title={isDeposit ? 'Withdrawal will take 7 days' : 'You can claim funds after 7 days gap'}
				subtitle={
					isDeposit
						? ''
						: 'Withdrawal will take 7 days. See “Action history” to stay in touch with the transaction statement.'
				}
			/>
		</div>
	)
}
