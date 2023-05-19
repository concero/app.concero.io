import { FC } from 'react'
import { Highlight } from '../../tags/Highlight/Highlight'
import { Tag } from '../../tags/Tag/Tag.tsx'
import { colors } from '../../../constants/colors.ts'

export interface HighlightsCardProps {}

export const HighlightsCard: FC<HighlightsCardProps> = () => (
  <div className="card f1">
    <Highlight size="lg" title="Total Value Locked" value="$85000" valueSecondary="3 BTC">
      <Tag
        fgColor={colors.green.dark}
        bgColor={colors.green.darkest}
        leftIcon={{ name: 'ArrowUpLeft', iconProps: { size: 18 } }}
      >
        +2.55%
      </Tag>
    </Highlight>
  </div>
)
