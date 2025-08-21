import { TUserResponse } from '@/entities/User'
import { TermsOfUseVersion } from '../consts/versions'

export const termsIsActual = (user?: TUserResponse | null) => {
	// If he has not signed or has expired
	if (!user || !user.details || user.details.termsOfUseSignedVersion !== TermsOfUseVersion.V1) {
		return false
	} else {
		return true
	}
}
