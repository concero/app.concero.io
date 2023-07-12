import { FC, useEffect, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import classNames from './NewsCard.module.pcss'
import { columns } from './columns'
import { Button } from '../../buttons/Button/Button'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { getPosts } from '../../../api/cryptopanic/getPosts'

interface NewsCardProps {}

export const NewsCard: FC<NewsCardProps> = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const fetchNews = async (page) => {
    setIsLoading(true)
    const response = await getPosts({ currencies: ['BTC', 'ETH', 'BNB'], page })
    setData([...data, ...response.results])
    setIsLoading(false)
  }
  useEffect(() => {
    fetchNews(page)
  }, [])

  return (
    <div className={`${classNames.container} card`}>
      <CardHeader title="News">
        <Button
          variant="subtle"
          rightIcon={{
            name: 'ChevronDown',
            iconProps: { size: 18 },
          }}
          size="sm"
        >
          <CryptoSymbol name="BNB" symbol="BNB" />
        </Button>
      </CardHeader>
      <Table
        items={data}
        columns={columns}
        isHeaderVisible={false}
        isLoading={isLoading}
        onEndReached={() => fetchNews(page + 1)}
      />
    </div>
  )
}
