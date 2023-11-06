import { FC, useContext, useEffect } from 'react'
import { Table } from '../../layout/Table/Table'
import classNames from './NewsCard.module.pcss'
import { getMoreNews, getNews } from './getNews'
import { columns } from './columns'
import { NotificationsContext } from '../../../hooks/notificationsContext'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { useNewsReducer } from './newsReducer'
import { DataContext } from '../../../hooks/DataContext/DataContext'
import { ListModal } from '../../modals/ListModal/ListModal'
import { ListEntityButton } from '../../buttons/ListEntityButton/ListEntityButton'
import { DataContextValue } from '../../../hooks/DataContext/types'
import { Button } from '../../buttons/Button/Button'
import { CardHeader } from '../CardHeader/CardHeader'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { useTranslation } from 'react-i18next'

interface NewsCardProps {}

export const NewsCard: FC<NewsCardProps> = () => {
	const { selection } = useContext(SelectionContext)
	const { getTokens } = useContext<DataContextValue>(DataContext)
	const { addNotification } = useContext(NotificationsContext)
	const [{ data, isLoading, timestamp, isModalVisible, selectedToken }, dispatch] = useNewsReducer(selection)
	const { t } = useTranslation()

	useEffect(() => {
		if (!selectedToken) return
		getNews(data, dispatch, selectedToken, timestamp, addNotification)
	}, [selectedToken])

	useEffect(() => {
		if (!selection.swapCard.to.token) return
		dispatch({ type: 'SET_SELECTED_TOKEN', payload: selection.swapCard.to.token })
	}, [selection.swapCard.to.token.symbol])

	const handleSelectToken = token => {
		dispatch({ type: 'SET_SELECTED_TOKEN', payload: token })
		dispatch({ type: 'SET_MODAL_VISIBILITY', payload: false })
		dispatch({ type: 'SET_TIMESTAMP', payload: 0 })
	}

	const handleShowModal = async () => {
		dispatch({ type: 'SET_MODAL_VISIBILITY', payload: true })
	}

	return (
		<>
			<div className={classNames.container}>
				<CardHeader title={t('newsCard.title')}>
					<Button variant="black" size="sm" onClick={handleShowModal}>
						<CryptoSymbol src={selectedToken.logoURI} symbol={selectedToken.symbol} />
					</Button>
				</CardHeader>
				<Table
					items={data}
					columns={columns}
					isHeaderVisible={false}
					isLoading={isLoading}
					onEndReached={() => getMoreNews(data, dispatch, selectedToken, timestamp, addNotification)}
				/>
			</div>
			<ListModal
				title={t('modal.selectToken')}
				isOpen={isModalVisible}
				setIsOpen={value => dispatch({ type: 'SET_MODAL_VISIBILITY', payload: value })}
				onSelect={token => handleSelectToken(token)}
				getItems={({ offset, limit, search }) => getTokens({ chainId: selection.swapCard.to.chain.id, offset, limit, search })}
				RenderItem={ListEntityButton}
			/>
		</>
	)
}
