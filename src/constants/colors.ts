import colorsJson from './colors.json'

type ColorSet<TKey extends string> = {
  [key in TKey]: string
}

type ColorKeys = keyof typeof colorsJson

type Colors = {
  [key in ColorKeys]: key extends string ? ColorSet<Extract<keyof (typeof colorsJson)[key], string>> : string
}

export const colors = colorsJson as Colors
