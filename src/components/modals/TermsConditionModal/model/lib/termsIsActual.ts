import { IUser } from '../../../../../api/concero/user/userType'

export const termsIsActual = (user?: IUser) => {
	// If he has not signed or has expired
	if (!user || !user.termsAcceptedAt || user.termsAcceptedAt < 1737373201) {
		return false
	} else {
		return true
	}
}
