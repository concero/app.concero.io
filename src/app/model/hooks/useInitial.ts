import { initPosthog } from '@/shared/lib/hooks/posthog/initPosthog'
import { useLoadPosthogInstance } from '@/shared/lib/hooks/posthog/useLoadPosthogInstance'

export const useInitial = () => {
	useLoadPosthogInstance()
	initPosthog()
}
