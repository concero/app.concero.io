import { FC, useContext } from 'react'
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react'
import classNames from './Highlight.module.pcss'
import { Tag } from '../Tag/Tag'
import { ThemeContext } from '../../../hooks/themeContext'

interface HighlightProps {
  size: 'sm' | 'md' | 'lg'
  item: {
    title: string
    value: string
    valueSecondary?: string | undefined
    last_24h: string
  }
}

const getHighlightClasses = (size: HighlightProps['size']) => {
  const baseClasses = [classNames.container]
  const sizeClass = size ? classNames[size] : ''

  return baseClasses.concat(sizeClass).join(' ')
}

export const Highlight: FC<HighlightProps> = ({ item: { title, value, valueSecondary, last_24h }, size = 'md' }) => {
  const { colors } = useContext(ThemeContext)
  const highlightClasses = getHighlightClasses(size)

  const tagColor = last_24h?.split('')[0] === '-' ? 'red' : 'green'
  const tagArrow = last_24h?.split('')[0] === '-' ? <IconArrowDownRight size={18} /> : <IconArrowUpRight size={18} />
  return (
    <div className={highlightClasses}>
      <div className={classNames.topRow}>
        {title ? <h5 className="cardHeaderTitle">{title}</h5> : null}
        {valueSecondary ? <Tag color={tagColor} leftIcon={tagArrow} size={size} title={`${last_24h}%`} /> : null}
      </div>
      <div className={classNames.bottomRow}>
        <h2>{value}</h2>
        {valueSecondary ? (
          <div className={classNames.secondary}>{valueSecondary}</div>
        ) : last_24h ? (
          <Tag color={tagColor} leftIcon={tagArrow} size={size} title={`${last_24h}%`} />
        ) : null}
      </div>
    </div>
  )
}
