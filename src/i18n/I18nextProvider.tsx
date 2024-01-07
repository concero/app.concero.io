import i18next from 'i18next'
import { type ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { translations } from './translations'
import { getItem } from '../utils/localStorage'

interface i18nextProviderProps {
	children: ReactNode
}

export function I18Provider({ children }: i18nextProviderProps) {
	const i18n = i18next.createInstance({
		debug: false,
		fallbackLng: 'en',
		lng: getItem<string>('language', 'en') ?? 'en',
		resources: translations,
	})

	i18n.init()

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
