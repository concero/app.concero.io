import type { Meta, StoryObj } from '@storybook/react'
import { QuestPreviewCard, TQuestPreviewSize } from './QuestPreviewCard'
import { UnionToTuple } from '@/shared/types/UnionToTuple'
const sizes: UnionToTuple<TQuestPreviewSize> = ['s', 'm', 'l', 'xl']

const meta: Meta<typeof QuestPreviewCard> = {
	component: QuestPreviewCard,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: sizes,
			table: {
				defaultValue: {
					summary: sizes[0],
				},
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
