import { numberToFormatString } from '../../../../utils/formatting'

export const handleBalance = ({ setBalance, data }) => {
  const balance = data?.value ? numberToFormatString(Number(data?.value) / Math.pow(10, data?.decimals)) : 0
  const symbol = data?.symbol ? data.symbol : ''

  const result = `${balance} ${symbol}`
  setBalance(result)
}
