import { useLoadPosthogInstance } from '@/shared/lib/hooks/posthog/useLoadPosthogInstance'

export const useInitial = () => {
	useLoadPosthogInstance()
}
