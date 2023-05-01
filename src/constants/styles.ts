import stylesJson from './styles.json'
import { NestedObj } from '../types/utils'

type stylesKeys = keyof typeof stylesJson.st
type styles = NestedObj<typeof stylesJson.st, stylesKeys>
export const sp = stylesJson.st as styles
