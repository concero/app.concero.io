import classNames from './FeeDetailsDropdown.module.pcss'

export const FeeDetailsDropdown = () => {
	return (
		<div className={classNames.wrap}>
			<div className={classNames.container}>
				<div className="row w-full jsb ac">
					<p className="body2">Chainlink services </p>
					<p className={`${classNames.priceFee} body2`}>3 USDC</p>
				</div>
			</div>
		</div>
	)
}
