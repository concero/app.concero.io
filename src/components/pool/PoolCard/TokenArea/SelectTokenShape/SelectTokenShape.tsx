import classNames from './SelectTokenShape.module.pcss'

interface Props {
	symbol: string
	chainName: string
}

export const SelectTokenShape = ({ symbol, chainName }: Props) => {
	return (
		<div className={classNames.selectTokenShape}>
			<h4>{symbol}</h4>
			<p className={'body2'}>{chainName}</p>
		</div>
	)
}
