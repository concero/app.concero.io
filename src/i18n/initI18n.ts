import i18next from 'i18next'

export async function initI18n() {
	await i18next.init({
		lng: 'en',
		debug: true,
		resources: {
			en: {
				translation: {
					test: 'hello world',
				},
			},
		},
	})
}
