import { FC, useContext, useEffect, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import classNames from './NewsCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { fetchNews } from '../../../api/cryptopanic/fetchNews'
import { EntityListModal } from '../../modals/EntityListModal/EntityListModal'
import { columns, modalColumns } from './columns'
import { lifiTokens } from '../../../constants/lifiTokens'
import { NotificationsContext } from '../../../hooks/notificationsContext'
import { SelectionContext } from '../../../hooks/SelectionContext'

interface NewsCardProps {}

export const NewsCard: FC<NewsCardProps> = () => {
  const { addNotification } = useContext(NotificationsContext)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedToken, setSelectedToken] = useState(lifiTokens['1'][0])
  const [mappedTokens, setMappedTokens] = useState(lifiTokens['1'].slice(0, 50))
  const { selection } = useContext(SelectionContext)

  useEffect(() => {
    if (!selectedToken) return
    fetchNews(setData, setIsLoading, addNotification, false, {
      currencies: [selectedToken.symbol],
      page,
    })
  }, [selectedToken])

  useEffect(() => {
    if (!selection.swapCard.to.token) return
    setSelectedToken(selection.swapCard.to.token)
  }, [selection.swapCard.to.token])

  const handleSelectToken = (token) => {
    setSelectedToken(token)
    setIsModalVisible(false)
  }

  return (
    <div>
      <div className={`${classNames.container} card`}>
        <CardHeader title="News">
          <Button variant="black" size="sm" onClick={() => setIsModalVisible(true)}>
            <CryptoSymbol src={selectedToken.logoURI} symbol={selectedToken.symbol} />
          </Button>
        </CardHeader>
        <Table
          items={data}
          columns={columns}
          isHeaderVisible={false}
          isLoading={isLoading}
          onEndReached={() => {
            fetchNews(setData, setIsLoading, addNotification, true, {
              currencies: [selectedToken.symbol],
              page: page + 1,
            })
            setPage(page + 1)
          }}
        />
      </div>
      <EntityListModal
        title="Select token"
        show={isModalVisible}
        setShow={setIsModalVisible}
        data={lifiTokens['1']}
        visibleData={mappedTokens}
        columns={modalColumns}
        onSelect={(token) => handleSelectToken(token)}
        onEndReached={() => setMappedTokens([...mappedTokens, ...lifiTokens['1'].slice(mappedTokens.length, mappedTokens.length + 50)])}
      />
    </div>
  )
}
