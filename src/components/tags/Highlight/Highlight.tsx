import { FC, ReactNode } from 'react'
import classNames from './Highlight.module.pcss'
import { colors } from '../../../constants/colors.ts'
import { Tag } from '../Tag/Tag.tsx'

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

/**
 A customizable Highlight component
 @param {string} title - The title displayed above the value.
 @param {string} value - The main value displayed in large text.
 @param {string} [size='md'] - The size of the value text. Can be one of 'sm', 'md', or 'lg'.
 @param {string} [valueSecondary] - A secondary value displayed below the main value.
 @param {ReactNode} [children] - The children of the component.
 @returns {JSX.Element} - The rendered Highlight element.
 @example
 <Highlight size={'lg'} title="Balance" value="1000 USD">
 <button>Refresh</button>
 </Highlight>
 */
export const Highlight: FC<HighlightProps> = ({
  item: { title, value, valueSecondary, last_24h },
  size = 'md',
}) => {
  const highlightClasses = getHighlightClasses(size)

  const textColor = last_24h.split('')[0] === '-' ? colors.red.dark : colors.green.dark
  const bgColor = last_24h.split('')[0] === '-' ? colors.red.darkest : colors.green.darkest
  const tagArrow = last_24h.split('')[0] === '-' ? 'ArrowDownRight' : 'ArrowUpRight'

  return (
    <div className={highlightClasses}>
      <div className={classNames.topRow}>
        <h5>{title}</h5>
        {valueSecondary ? (
          <Tag
            fgColor={textColor}
            bgColor={bgColor}
            leftIcon={{
              name: tagArrow,
              iconProps: { size: 18 },
            }}
          >
            {`${last_24h}%`}
          </Tag>
        ) : null}
      </div>
      <div className={classNames.bottomRow}>
        <h2>{value}</h2>
        {valueSecondary ? (
          <div className={classNames.secondary}>{valueSecondary}</div>
        ) : (
          <Tag
            fgColor={textColor}
            bgColor={bgColor}
            leftIcon={{
              name: tagArrow,
              iconProps: { size: 18 },
            }}
          >
            {`${last_24h}%`}
          </Tag>
        )}
      </div>
    </div>
  )
}
