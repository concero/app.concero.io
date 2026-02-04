import { UserSocialType } from '@/entities/User'
import { TUserSocial } from '@/entities/User/model/types/response'

export const hasConnectedX = ({ socials }: { socials: TUserSocial[] }) =>
	socials.some(social => social.type === UserSocialType.X && social.connectedAt)
