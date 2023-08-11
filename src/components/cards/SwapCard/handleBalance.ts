import { numberToFormatString } from '../../../utils/formatting'

export const handleBalance = ({ setBalance, data }) => {
  const result = `${numberToFormatString(Number(data?.value) / Math.pow(10, data?.decimals))} ${data?.symbol}`
  setBalance(result)
}
