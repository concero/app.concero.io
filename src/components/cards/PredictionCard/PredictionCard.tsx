import { FC } from 'react'
import classNames from './PredictionCard.module.pcss'
import { IconAlertTriangle, IconArrowDown, IconArrowUp } from '@tabler/icons-react'
import { CardHeader } from '../CardHeader/CardHeader'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { colors } from '../../../constants/colors'

interface PredictionCardProps {
  stakingState: StakingState
}

interface PredictionItemCardProps {
  predictedClass: string
  value: string | number
}

const PredictionItemCard: FC<PredictionItemCardProps> = ({ predictedClass, value }) => {
  const containerClasses = `${classNames.itemContainer} ${predictedClass === 'Down' ? classNames.down : classNames.up}`

  return (
    <div className={`card ${containerClasses}`}>
      <div className={classNames.sideContainer}>
        {predictedClass === 'Down' ? <IconArrowDown size={16} color={colors.red.light} /> : <IconArrowUp size={16} color={colors.green.main} />}
        <p className={'body1'}>{predictedClass}</p>
      </div>
      <p className={'body1'}>{value + '%'}</p>
    </div>
  )
}

const RiskCard: FC = () => {
  return (
    <div className={`card ${classNames.riskContainer} ${classNames.down}`}>
      <IconAlertTriangle size={16} color={colors.red.dark} />
      <p className={'body1'}>Impermanent loss risk</p>
    </div>
  )
}

export const PredictionCard: FC<PredictionCardProps> = ({ stakingState }) => {
  const predictions = stakingState.selectedVault?.predictions

  return predictions?.predictedClass ? (
    <div className={classNames.container}>
      <CardHeader title="Prediction" />
      <div className={classNames.innerContainer}>
        <PredictionItemCard predictedClass={predictions.predictedClass} value={predictions.predictedProbability} />
        {stakingState.selectedVault.ilRisk === 'yes' ? <RiskCard /> : null}
      </div>
    </div>
  ) : null
}
