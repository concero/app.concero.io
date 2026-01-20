import { useAccount } from 'wagmi'
import { useUserByAddress } from '@/entities/User'
import { Address } from 'viem'
import { TechWorksScreen } from '@/components/screens/TechWorksScreen/TechWorksScreen'
import { configEnvs } from '@/shared/consts/config/config'
import { Navigate } from 'react-router-dom'
import { PageWrap } from '@/shared/ui'
import { Banners } from '@/entities/Social'
import { HStack } from '@/shared/ui/Stack'
import { Spinner } from '@concero/ui-kit'
import { routes } from '@/shared/consts/routing/routes'
import cls from './ProfilePage.module.pcss'
import { ProfilePageContent } from './ProfilePageContent'

export default function ProfilePage() {
	const { address } = useAccount()

	const { data: userResponse } = useUserByAddress(address ? (address as Address) : undefined)
	const user = userResponse?.payload
	if (configEnvs.PROFILE_IS_NOT_AVAILABLE) {
		return <TechWorksScreen />
	}
	if (!address) {
		return <Navigate to={routes.quests} replace />
	}
	if (!user) {
		return (
			<PageWrap className={cls.page_wrap} key={'PageWrap'}>
				<Banners key={'Banners'} />
				<HStack justify="center" max>
					<Spinner />
				</HStack>
			</PageWrap>
		)
	}

	return <ProfilePageContent user={user} />
}
