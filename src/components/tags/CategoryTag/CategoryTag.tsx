import { getCategoryIconByTitle } from './getCategoryIconByTitle'
import classNames from '../../cards/EarnCard/EarnCard.module.pcss'
import { Tag } from '../Tag/Tag'

interface CategoryTagProps {
	category: string
	isSelected?: boolean
}

export function CategoryTag({ category, isSelected = false }: CategoryTagProps) {
	return (
		<Tag leftIcon={getCategoryIconByTitle(category, isSelected)} color={isSelected ? 'mainDarker' : 'grey'}>
			<p className={`body1 ${isSelected ? classNames.selectedText : ''}`}>{category}</p>
		</Tag>
	)
}
