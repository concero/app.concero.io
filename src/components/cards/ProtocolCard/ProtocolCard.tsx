import { useEffect, useState } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Button } from '../../buttons/Button/Button'
import classNames from './ProtocolCard.module.pcss'
import { Avatar } from '../../tags/Avatar/Avatar'
import { StakingState } from '../../screens/StakingScreen/stakingReducer/types'
import { ProtocolModal } from './ProtocolModal/ProtocolModal'
import { getProtocolData } from './getProtocolData'
import { Protocol } from './types'
import { useTranslation } from 'react-i18next'

interface ProtocolCardProps {
	stakingState: StakingState
}

export function ProtocolCard({ stakingState }: ProtocolCardProps) {
	const [isOpened, setIsOpened] = useState(false)
	const [protocolData, setProtocolData] = useState<Protocol | null>(null)
	const { selectedVault } = stakingState
	const { t } = useTranslation()

	useEffect(() => {
		getProtocolData(selectedVault?.project._id, setProtocolData)
	}, [selectedVault])

	return (
		<div>
			<CardHeader title={t('stakingDetailsCard.protocol')} />
			<Button variant="subtle" onClick={() => setIsOpened(true)}>
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
