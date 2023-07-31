import { get } from '../requests'
import { authToken } from './config'

export const fetchNews = async (data, dispatch, addNotification, append = false, { currencies, page, filter = '' }) => {
  const on_ok = (res) => {
    dispatch({ type: 'SET_LOADING', payload: false })
    dispatch({ type: 'SET_DATA', payload: append ? [...data, ...res.data.results] : res.data.results })
  }
  const on_err = (res) => {
    dispatch({ type: 'SET_LOADING', payload: false })
    addNotification({
      title: "Couldn't fetch news",
      message: res.data.error,
      color: 'red',
    })
  }

  const currencyParam = currencies.join(',')
  const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${authToken}&currencies=${currencyParam}&filter=${filter}&page=${page}`

  dispatch({ type: 'SET_LOADING', payload: true })
  get({ url }, on_ok, on_err)
}
