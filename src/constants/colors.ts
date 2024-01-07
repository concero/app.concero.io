import colorsJson from './json/colors-dark.json'
import { type NestedObj } from '../types/utils'

export type ColorKeys = keyof typeof colorsJson.color

export type Colors = NestedObj<typeof colorsJson.color, ColorKeys>

export const colors = colorsJson.color as Colors
