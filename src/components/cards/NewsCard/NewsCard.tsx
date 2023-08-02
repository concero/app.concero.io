import { FC, useContext, useEffect } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import classNames from './NewsCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { getNews } from './getNews'
import { EntityListModal } from '../../modals/EntityListModal/EntityListModal'
import { columns, modalColumns } from './columns'
import { lifiTokens } from '../../../constants/lifiTokens'
import { NotificationsContext } from '../../../hooks/notificationsContext'
import { SelectionContext } from '../../../hooks/SelectionContext'
import { useNewsReducer } from './newsReducer'

interface NewsCardProps {}

export const NewsCard: FC<NewsCardProps> = () => {
  const { selection } = useContext(SelectionContext)
  const { addNotification } = useContext(NotificationsContext)
  const [{ data, isLoading, page, isModalVisible, selectedToken, mappedTokens }, dispatch] = useNewsReducer(selection)

  useEffect(() => {
    if (!selectedToken) return
    getNews(data, dispatch, addNotification, false, {
      currencies: [selectedToken.symbol],
      page,
    })
  }, [selectedToken])

  useEffect(() => {
    if (!selection.swapCard.to.token) return
    dispatch({ type: 'SET_SELECTED_TOKEN', payload: selection.swapCard.to.token })
  }, [selection.swapCard.to.token])

  const handleSelectToken = (token) => {
    dispatch({ type: 'SET_SELECTED_TOKEN', payload: token })
    dispatch({ type: 'SET_MODAL_VISIBILITY', payload: false })
  }

  return (
    <div>
      <div className={`${classNames.container} card`}>
        <CardHeader title="News">
          <Button variant="black" size="sm" onClick={() => dispatch({ type: 'SET_MODAL_VISIBILITY', payload: true })}>
            <CryptoSymbol src={selectedToken.logoURI} symbol={selectedToken.symbol} />
          </Button>
        </CardHeader>
        <Table
          items={data}
          columns={columns}
          isHeaderVisible={false}
          isLoading={isLoading}
          onEndReached={() => {
            getNews(data, dispatch, addNotification, true, {
              currencies: [selectedToken.symbol],
              page: page + 1,
            })
            dispatch({ type: 'INCREMENT_PAGE' })
          }}
        />
      </div>
      <EntityListModal
        title="Select token"
        show={isModalVisible}
        setShow={(value) => dispatch({ type: 'SET_MODAL_VISIBILITY', payload: value })}
        data={lifiTokens['1']}
        visibleData={mappedTokens}
        columns={modalColumns}
        onSelect={(token) => handleSelectToken(token)}
        onEndReached={() => dispatch({
            type: 'ADD_MAPPED_TOKENS',
            payload: lifiTokens['1'].slice(mappedTokens.length, mappedTokens.length + 50),
          })}
      />
    </div>
  )
}
