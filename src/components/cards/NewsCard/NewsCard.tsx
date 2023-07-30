import { FC, useContext, useEffect, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import classNames from './NewsCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { fetchNews } from '../../../api/cryptopanic/fetchNews'
import { EntityListModal } from '../../modals/EntityListModal/EntityListModal'
import { columns, modalColumns } from './columns'
import { tokens } from '../../../constants/tokens'
import { NotificationsContext } from '../../../hooks/notificationsContext'

interface NewsCardProps {}

export const NewsCard: FC<NewsCardProps> = () => {
  const { addNotification } = useContext(NotificationsContext)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedToken, setSelectedToken] = useState(tokens['1'][0])
  const [mappedTokens, setMappedTokens] = useState(tokens['1'].slice(0, 50))

  useEffect(() => {
    if (!selectedToken) return
    fetchNews(setData, setIsLoading, addNotification, false, { currencies: [selectedToken.symbol], page })
  }, [selectedToken])

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
          onEndReached={() => fetchNews(setData, setIsLoading, addNotification, true, {
              currencies: [selectedToken.symbol],
              page: page + 1,
            })}
        />
      </div>
      <EntityListModal
        title="Select chain"
        show={isModalVisible}
        setShow={setIsModalVisible}
        data={tokens['1']}
        visibleData={mappedTokens}
        columns={modalColumns}
        onSelect={(token) => handleSelectToken(token)}
        onEndReached={() => setMappedTokens([...mappedTokens, ...tokens['1'].slice(mappedTokens.length, mappedTokens.length + 50)])}
      />
    </div>
  )
}
