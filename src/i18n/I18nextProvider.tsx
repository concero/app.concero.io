import i18next from 'i18next'
import { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { translations } from './translations'

interface i18nextProviderProps {
	children: ReactNode
}

export function I18Provider({ children }: i18nextProviderProps) {
	const i18n = i18next.createInstance({
		debug: true,
		fallbackLng: 'en',
		lng: 'es',
		resources: translations,
	})

	i18n.init()

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
