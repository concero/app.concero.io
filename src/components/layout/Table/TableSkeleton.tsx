import classNames from './Table.module.pcss'

export function TableSkeleton({ columns }) {
  return (
    <div className={classNames.skeletonTable}>
      <div className={classNames.skeletonHeader}>
        {columns.map((column, index) => (
          <div key={index} className={classNames.skeletonHeaderCell} />
        ))}
      </div>

      <div className={classNames.skeletonColumns}>
        {[...Array(10)].map((_, index) => (
          <div key={index} className={classNames.skeletonCell} />
        ))}
      </div>
    </div>
  )
}
