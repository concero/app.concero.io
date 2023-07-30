import { FC, useMemo, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import classNames from './NewsCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { getPosts } from '../../../api/cryptopanic/getPosts'
import { EntityListModal } from '../../modals/EntityListModal/EntityListModal'
import { columns, modalColumns } from './columns'
import { colors } from '../../../constants/colors'
import { tokens } from '../../../constants/tokens'

interface NewsCardProps {}

export const NewsCard: FC<NewsCardProps> = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedToken, setSelectedToken] = useState(tokens['1'][0])
  const [mappedTokens, setMappedTokens] = useState(tokens['1'].slice(0, 50))

  const fetchNews = async (page) => {
    setIsLoading(true)
    const response = await getPosts({ currencies: [selectedToken.symbol], page })
    setData(response.results)
    setIsLoading(false)
  }

  const fetchMoreNews = async (page) => {
    setIsLoading(true)
    const response = await getPosts({ currencies: [selectedToken.symbol], page })
    setData([...data, ...response.results])
    setIsLoading(false)
  }

  useMemo(() => {
    fetchNews(page)
  }, [selectedToken])

  const handleSelectToken = (token) => {
    setSelectedToken(token)
    setIsModalVisible(false)
  }

  return (
    <div>
      <div className={`${classNames.container} card`}>
        <CardHeader title="News">
          <Button
            variant="subtle"
            rightIcon={{
              name: 'ChevronDown',
              iconProps: { size: 18, color: colors.text.secondary },
            }}
            size="sm"
            onClick={() => setIsModalVisible(true)}
          >
            <CryptoSymbol src={selectedToken.logoURI} symbol={selectedToken.symbol} />
          </Button>
        </CardHeader>
        <Table
          items={data}
          columns={columns}
          isHeaderVisible={false}
          isLoading={isLoading}
          onEndReached={() => fetchMoreNews(page + 1)}
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
        onEndReached={() =>
          setMappedTokens([...mappedTokens, ...tokens['1'].slice(mappedTokens.length, mappedTokens.length + 50)])
        }
      />
    </div>
  )
}
