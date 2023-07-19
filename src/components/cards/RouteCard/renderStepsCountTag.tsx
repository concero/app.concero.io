import classNames from './RouteCard.module.pcss'
import Icon from '../../Icon'
import { colors } from '../../../constants/colors'

export const renderStepsCountTag = (
  isRoutesCollapsed: boolean,
  setIsRoutesCollapsed: (boolean) => void,
  isBestRoute: boolean,
  length: number | undefined,
  getColor: () => string | undefined,
) => (
  <>
    {isRoutesCollapsed ? (
      <div
        className={`${classNames.tagStyle} ${classNames.showAllTag} ${getColor('tag')}`}
        onClick={() => setIsRoutesCollapsed(false)}
      >
        <Icon name="Refresh" size={20} color={isBestRoute ? colors.primary.light : colors.text.secondary} />
        <div>
          <h5 className={`${classNames.bodyColor} ${getColor('text')}`}>{`+${length} routes`}</h5>
        </div>
      </div>
    ) : null}
  </>
)
