import { apiRequest } from '../../../api/requests'
import { get } from '../../../api/client'

export const getMoreNews = async (data, dispatch, selectedToken, timestamp, addNotification) => {
  function on_ok(res) {
    const news = res.data.Data
    dispatch({
      type: 'SET_DATA',
      payload: [...data, ...news],
    })
    dispatch({
      type: 'SET_TIMESTAMP',
      payload: news[news.length - 1].published_on,
    })
  }

  function on_err(err) {
    addNotification({
      title: "Couldn't fetch more news",
      message: err,
      color: 'red',
    })
  }

  const url = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=${selectedToken.symbol}&lTs=${timestamp}`
  const { res, ok, err } = await apiRequest(await get(url))
  if (ok) on_ok(res)
  if (err) on_err(err)
}

export const getNews = async (data, dispatch, selectedToken, timestamp, addNotification) => {
  // not parsing data further, because of the newsColumns
  function on_ok(res) {
    const news = res.data.Data

    dispatch({
      type: 'SET_LOADING',
      payload: false,
    })
    dispatch({
      type: 'SET_DATA',
      payload: news,
    })
    dispatch({
      type: 'SET_TIMESTAMP',
      payload: news[news.length - 1].published_on,
    })
  }

  function on_err(err) {
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    })
    addNotification({
      title: "Couldn't fetch news",
      message: err,
      color: 'red',
    })
  }

  const url = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=${selectedToken.symbol}&lTs=${timestamp}`
  dispatch({
    type: 'SET_LOADING',
    payload: true,
  })
  const { res, ok, err } = await apiRequest(await get(url))
  if (ok) on_ok(res)
  if (err) on_err(err)
}
