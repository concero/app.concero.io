import colorsJson from './json/colors.json'
import { NestedObj } from '../types/utils'

type ColorKeys = keyof typeof colorsJson.color

type Colors = NestedObj<typeof colorsJson.color, ColorKeys>

export const colors = colorsJson.color as Colors
