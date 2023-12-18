import { FC } from 'react'
import { Vault } from '../../screens/EarnScreen/earnReducer/types'

interface RenderTagsProps {
	vault: Vault
	isSelected: boolean
}

export const renderTags: FC<RenderTagsProps> = ({ vault, isSelected }) => (
	<>
		{/* <Icon name={'Lock'} className={`${classNames.icon} ${isSelected ? classNames.selectedText : ''}`} /> */}
		{/* <h5 className={`body1 ${isSelected ? classNames.selectedText : ''}`}> */}
		{/*   {secondsConverter(vault.execution_duration_sec)} */}
		{/* </h5> */}
		{/* <Icon name={'Stack2'} className={`${classNames.icon} ${isSelected ? classNames.selectedText : ''}`} /> */}
		{/* {vault.insured ? <Icon name={'Shield'} className={classNames.icon} color={colors.green.main} /> : null} */}
	</>
)
