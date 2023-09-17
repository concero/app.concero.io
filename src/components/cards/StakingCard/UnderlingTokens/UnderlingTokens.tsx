import classNames from './UnderlingTokens.module.pcss'
import { Avatar } from '../../../tags/Avatar/Avatar'
import { InputTokens } from '../../../screens/StakingScreen/stakingReducer/types'

interface UnderlingTokensProps {
  underlingTokens: InputTokens[]
}

export function UnderlingTokens({ underlingTokens }: UnderlingTokensProps) {
  return (
    <div className={classNames.container}>
      {underlingTokens.map((token, index) => {
        if (!token) return null
        return (
          <div className={`${classNames.tokenContainer} ${index === 1 ? classNames.selected : ''} `}>
            <Avatar src={token.logoURI} size="sm" />
            <p className={'body1'}>{token.symbol}</p>
          </div>
        )
      })}
    </div>
  )
}
