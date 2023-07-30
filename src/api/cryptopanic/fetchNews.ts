import { get } from '../requests'
import { authToken } from './config'

export const fetchNews = async (
  setData,
  setIsLoading,
  addNotification,
  append = false,
  { currencies, page, filter = '' },
) => {
  const on_ok = (res) => {
    setData((prev) => (append ? [...prev, ...res.data.results] : res.data.results))
    setIsLoading(false)
  }
  const on_err = (res) => {
    setIsLoading(false)
    addNotification({
      title: "Couldn't fetch news",
      message: res.data.error,
      color: 'red',
    })
  }

  const currencyParam = currencies.join(',')
  const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${authToken}&currencies=${currencyParam}&filter=${filter}&page=${page}`

  setIsLoading(true)
  get({ url }, on_ok, on_err)
}
