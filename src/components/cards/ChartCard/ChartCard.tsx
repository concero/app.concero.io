import { type FC, memo, useCallback, useContext, useEffect } from 'react'
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets'
import { Button } from '../../buttons/Button/Button'
import classNames from './ChartCard.module.pcss'
import { Chart } from '../../layout/Chart/Chart'
import { Beacon } from '../../layout/Beacon/Beacon'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { SegmentedControl } from '../../buttons/SegmentedControl/SegmentedControl'
import { intervals } from './constants'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { ThemeContext } from '../../../hooks/themeContext'
import { useChartReducer } from './chartReducer'
import { fetchChartData } from '../../../api/defilama/fetchChartData'
import { NotificationsContext } from '../../../hooks/notificationsContext'
import { Card } from '../Card/Card'
import { DataContext } from '../../../hooks/DataContext/DataContext'
import { ListModal } from '../../modals/ListModal/ListModal'
import { ListEntityButton } from '../../buttons/ListEntityButton/ListEntityButton'
import { useTranslation } from 'react-i18next'

export interface ChartCardProps {}

const MainChart = memo(Chart)
const TradingViewChart = memo(AdvancedRealTimeChart)

export const ChartCard: FC<ChartCardProps> = () => {
	const { selection } = useContext(SelectionContext)
	const { getTokens } = useContext(DataContext)
	const { theme } = useContext(ThemeContext)
	const [{ chartType, token, interval, chartData }, dispatch] = useChartReducer(selection.swapCard)
	const { addNotification } = useContext(NotificationsContext)
	const isMobile = useMediaQuery('mobile')
	const { t } = useTranslation()

	const setData = (data: any[]) => {
		dispatch({ type: 'SET_CHART_DATA', payload: data })
	}

	useEffect(() => {
		fetchChartData(setData, addNotification, token.base.coinGeckoId, interval)

		const intervalId = setInterval(() => {
			fetchChartData(setData, addNotification, token.base.coinGeckoId, interval)
		}, 15000)

		return () => {
			clearInterval(intervalId)
		}
	}, [interval, token.base.symbol])

	useEffect(() => {
		dispatch({ type: 'SET_TOKEN', tokenType: 'base', payload: selection.swapCard.to.token })
	}, [selection.swapCard.to.token.symbol])

	const handleSelect = token => {
		dispatch({ type: 'SET_TOKEN', tokenType: 'base', payload: token })
		dispatch({ type: 'TOGGLE_MODAL_VISIBLE', tokenType: 'base' })
	}

	const setIsOpenCallback = useCallback(() => {
		dispatch({ type: 'TOGGLE_MODAL_VISIBLE', tokenType: 'base' })
	}, [dispatch])

	const handleSelectCallback = useCallback(
		token => {
			handleSelect(token)
		},
		[handleSelect],
	)

	const getItemsCallback = useCallback(
		async ({ offset, limit, search }) => {
			return await getTokens({
				chainId: selection.swapCard.to.chain.id,
				offset,
				limit,
				search,
			})
		},
		[getTokens, selection.swapCard.to.chain.id],
	)

	return (
		<Card className={classNames.container}>
			<div className={classNames.headerContainer}>
				<div className={classNames.selectChainContainer}>
					<h5 className="cardHeaderTitle">{t('chartCard.title')}</h5>
					<Button
						variant="black"
						size="sm"
						onClick={() => {
							dispatch({ type: 'TOGGLE_MODAL_VISIBLE', tokenType: 'base' })
						}}
					>
						<CryptoSymbol src={token.base.logoURI} symbol={token.base.symbol} />
					</Button>
					{!isMobile ? (
						<Button
							variant="black"
							size="sm"
							onClick={() => {
								dispatch({ type: 'TOGGLE_CHART_TYPE' })
							}}
						>
							<Beacon isOn={chartType === 'tradingView'} />
							<p className="body1">{t('chartCard.tradingView')}</p>
						</Button>
					) : null}
				</div>
				{chartType === 'coinGecko' ? (
					<SegmentedControl
						data={intervals}
						selectedItem={interval}
						setSelectedItem={item => {
							dispatch({ type: 'SET_INTERVAL', payload: item })
						}}
					/>
				) : null}
			</div>
			<div className="f1">
				{chartType === 'coinGecko' ? (
					<MainChart data={chartData} />
				) : (
					<TradingViewChart
						theme={theme}
						symbol={`BINANCE:${selection.swapCard.to.token.symbol}USDT`}
						interval="1"
						width="100%"
						height="100%"
						locale="en"
						hide_side_toolbar
						allow_symbol_change
						save_image
						container_id="tradingview_9e3a4"
					/>
				)}
			</div>
			<ListModal
				title={t('modal.selectToken')}
				isOpen={token.base.modalVisible}
				setIsOpen={setIsOpenCallback}
				onSelect={handleSelectCallback}
				getItems={getItemsCallback}
				RenderItem={ListEntityButton}
			/>
		</Card>
	)
}
