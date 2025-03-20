import { AccoutSettingsModal } from '@/entities/User'
import { NicknameConnect } from '../NicknameConnect/NicknameConnect'

export const AccoutSettings = () => {
	return <AccoutSettingsModal NicknameConnect={<NicknameConnect />} />
}
