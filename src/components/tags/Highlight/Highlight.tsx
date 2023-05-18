import { FC, ReactNode } from 'react'
import classNames from './Highlight.module.pcss'

interface HighlightProps {
  title: string
  value: string
  size: 'sm' | 'md' | 'lg'
  valueSecondary?: string
  children?: ReactNode
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
  title,
  value,
  size = 'md',
  valueSecondary,
  children,
}) => {
  const highlightClasses = getHighlightClasses(size)
  return (
    <div className={highlightClasses}>
      <div className={classNames.topRow}>
        <h4>{title}</h4>
        {children}
      </div>
      <div className={classNames.bottomRow}>
        <h2>{value}</h2>
        {valueSecondary && <div className={classNames.secondary}>{valueSecondary}</div>}
      </div>
    </div>
  )
}
