import React, { useContext, useEffect } from 'react'
import { animated, useTransition } from '@react-spring/web'
import { IconX } from '@tabler/icons-react'
import { NotificationsContext } from '../../../hooks/notificationsContext'
import classNames from './Notifications.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { Beacon } from '../../layout/Beacon/Beacon'

export function Notifications() {
	const { notifications, removeNotification } = useContext(NotificationsContext)

	const transitions = useTransition(notifications, {
		from: {
			opacity: 0,
			transform: 'translate3d(0,-40px,0)',
		},
		enter: {
			opacity: 1,
			transform: 'translate3d(0,0px,0)',
		},
		leave: {
			opacity: 0,
			transform: 'translate3d(0,-40px,0)',
		},
		keys: notification => notification.id,
	})

	useEffect(() => {
		const timers = notifications.map(
			notification =>
				setTimeout(() => {
					removeNotification(notification.id)
				}, 3500), // Change this to your preferred delay time in milliseconds
		)

		return () =>
			timers.forEach(timer => {
				clearTimeout(timer)
			})
	}, [notifications, removeNotification])

	return (
		<div className={classNames.container}>
			{transitions((style, item) => (
				<animated.div className={classNames.notification} style={style} key={item.id}>
					<div className="col">
						<div className="row ac">
							<Beacon isOn color={item.color} />
							{item.title}
							<Button variant="black" onClick={() => removeNotification(item.id)} leftIcon={<IconX size={18} />} />
						</div>
						<p className="body1">{item.message}</p>
					</div>
				</animated.div>
			))}
		</div>
	)
}
