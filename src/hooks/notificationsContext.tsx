import React, { createContext, useState } from 'react'

export const NotificationsContext = createContext(null)

export function NotificationsProvider({ children }) {
	const [notifications, setNotifications] = useState([])
	const addNotification = notification => {
		setNotifications(prev => [...prev, { ...notification, id: Date.now() }])
	}
	const removeNotification = id => {
		setNotifications(prev => prev.filter(n => n.id !== id))
	}
	return <NotificationsContext.Provider value={{ notifications, addNotification, removeNotification }}>{children}</NotificationsContext.Provider>
}
