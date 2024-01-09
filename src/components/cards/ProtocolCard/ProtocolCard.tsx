import { useEffect, useState } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Button } from '../../buttons/Button/Button'
import classNames from './ProtocolCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { type EarnState } from '../../screens/EarnScreen/earnReducer/types'
import { ProtocolModal } from './ProtocolModal/ProtocolModal'
import { getProtocolData } from './getProtocolData'
import { type Protocol } from './types'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '../../../hooks/useTracking'
import { action, category } from '../../../constants/tracking'

interface ProtocolCardProps {
	earnState: EarnState
}

export function ProtocolCard({ earnState }: ProtocolCardProps) {
	const [isOpened, setIsOpened] = useState(false)
	const [protocolData, setProtocolData] = useState<Protocol | null>(null)
	const { selectedVault } = earnState
	const { t } = useTranslation()

	function handleOpenProtocolModal() {
		setIsOpened(true)
		trackEvent({
			category: category.StakingScreen,
			action: action.ProtocolModalOpened,
			label: 'ProtocolModalOpened',
		})
	}

	useEffect(() => {
		getProtocolData(selectedVault?.project._id, setProtocolData)
	}, [selectedVault])

	return (
		<div>
			<CardHeader title={t('stakingDetailsCard.protocol')} />
			<Button
				variant="subtle"
				onClick={() => {
					setIsOpened(true)
				}}
			>
				<div className={classNames.cardContainer}>
					<div className={classNames.avatarContainer}>
						<Avatar src={selectedVault?.project?.logoURI ?? null} />
						<h5>{selectedVault?.project.name}</h5>
					</div>
					<IconChevronRight size={18} color={'var(--color-text-secondary)'} />
				</div>
			</Button>
			<ProtocolModal show={isOpened} setShow={setIsOpened} protocol={protocolData} />
		</div>
	)
}
