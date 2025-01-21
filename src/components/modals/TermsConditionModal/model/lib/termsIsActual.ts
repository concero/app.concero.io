import { IUser } from '../../../../../api/concero/user/userType'

export const termsIsActual = (user?: IUser) => {
	// If he has not signed or has expired
	if (!user || !user.termsOfUse || user.termsOfUse.accepted_version !== process.env.TERMS_OF_USE_ACTUAL_VERSION) {
		return false
	} else {
		return true
	}
}
