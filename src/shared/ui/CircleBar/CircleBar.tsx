import clsx from 'clsx'
import cls from './CircleBar.module.pcss'
import { ReactNode } from 'react'

type TCircleBarProps = {
	className?: string
	progress?: number
	children?: ReactNode
	variant?: 'default' | 'warning' | 'danger' | 'success'
}

export const CircleBar = (props: TCircleBarProps) => {
	const { className, progress = 0, children, variant = 'default' } = props
	const offset = ((100 - progress) / 100) * 2 * Math.PI * 48

	return (
		<div className={clsx(cls.circle_bar, className)} style={{ maxWidth: '160px', width: '100%' }}>
			<svg viewBox="0 -2 100 104" className={cls.svg} style={{ width: '96%', height: '100%' }}>
				<circle className={cls.track} cx="50" cy="50" r="48"></circle>
				<defs>
					<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" className={cls[`${variant || 'default'}_start`]} />
						<stop offset="100%" className={cls[`${variant || 'default'}_end`]} />
					</linearGradient>
				</defs>
				{progress != 0 ? (
					<circle
						className={cls.progress}
						cx="50"
						cy="50"
						r="48"
						style={{ strokeDashoffset: offset, stroke: 'url(#gradient)' }}
					></circle>
				) : null}
			</svg>
			<div className={cls.value_wrap}>{children}</div>
		</div>
	)
}
