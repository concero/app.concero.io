import { FC, useContext, useEffect } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import classNames from './NewsCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { getMoreNews, getNews } from './getNews'
import { EntityListModal } from '../../modals/EntityListModal/EntityListModal'
import { columns, modalColumns } from './columns'
import { NotificationsContext } from '../../../hooks/notificationsContext'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { useNewsReducer } from './newsReducer'
import { Card } from '../Card/Card'
import { DataContext } from '../../../hooks/DataContext/DataContext'

interface NewsCardProps {}

export const NewsCard: FC<NewsCardProps> = () => {
  const { selection } = useContext(SelectionContext)
  const { getTokens, tokens: dataTokens } = useContext(DataContext)
  const { addNotification } = useContext(NotificationsContext)
  const [{ data, isLoading, timestamp, isModalVisible, selectedToken, tokens }, dispatch] = useNewsReducer(selection)

  console.log('NewsCard selection', selection)
  useEffect(() => {
    if (!selectedToken) return
    getNews(data, dispatch, selectedToken, timestamp, addNotification)
  }, [selectedToken])

  useEffect(() => {
    if (!selection.swapCard.to.token) return
    dispatch({ type: 'SET_SELECTED_TOKEN', payload: selection.swapCard.to.token })
  }, [selection.swapCard.to.token.symbol])

  // useEffect(() => {
  //   populateTokens({ getTokens, dispatch, selection })
  // }, [])

  useEffect(() => {
    dispatch({ type: 'SET_TOKENS', payload: dataTokens[selection.swapCard.to.chain.id] })
  }, [dataTokens])

  const handleSelectToken = (token) => {
    dispatch({ type: 'SET_SELECTED_TOKEN', payload: token })
    dispatch({ type: 'SET_MODAL_VISIBILITY', payload: false })
    dispatch({ type: 'SET_TIMESTAMP', payload: 0 })
  }

  const handleShowModal = async () => {
    // let tokensData = await getTokens(selection.swapCard.to.chain.id)
    // dispatch({ type: 'SET_TOKENS', payload: tokens })
    dispatch({ type: 'SET_MODAL_VISIBILITY', payload: true })
  }
  return (
    <div>
      <Card className={classNames.container}>
        <CardHeader title="News">
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
      </Card>
      <EntityListModal
        title="Select token"
        show={isModalVisible}
        setShow={(value) => dispatch({ type: 'SET_MODAL_VISIBILITY', payload: value })}
        data={tokens}
        entitiesVisible={15}
        columns={modalColumns}
        onSelect={(token) => handleSelectToken(token)}
      />
    </div>
  )
}
