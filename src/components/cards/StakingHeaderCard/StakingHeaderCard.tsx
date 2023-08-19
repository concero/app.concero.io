import classNames from './StakingHeaderCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { Tag } from '../../tags/Tag/Tag'

interface StakingHeaderCardProps {
  route: any
}

export const StakingHeaderCard: FC<StakingHeaderCardProps> = ({ route }) => {
  return (
    <div className={`card ${classNames.container}`}>
      <div className={classNames.sideContainer}>
        <Avatar src={route.dex.logoURI} />
        <h5>{`${route.from.token.symbol}/${route.to.token.symbol}`}</h5>
        <Tag color={'main'}>
          <p className={'tagBody'}>Your position</p>
        </Tag>
      </div>
      <div className={classNames.sideContainer}>
        <Tag color={'main'}>
          <p className={'tagBody'}>Best</p>
        </Tag>
        <Tag color={'green'} title={'Insurable'} />
      </div>
    </div>
  )
}
