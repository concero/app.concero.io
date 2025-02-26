import type { Meta, StoryObj } from '@storybook/react'
import { QuestCard } from '../QuestCard'
import { TQuestCardStatus } from '@/entities/Quest/model/types/schema'
import { UnionToTuple } from '@/shared/types/UnionToTuple'
const statuses: UnionToTuple<TQuestCardStatus> = [
	'NOT_CONNECT',
	'READY_TO_START',
	'STARTED',
	'READY_TO_CLAIM',
	'FINISHED',
]
const meta: Meta<typeof QuestCard> = {
	component: QuestCard,
	tags: ['autodocs'],
	argTypes: {
		status: {
			control: 'select',
			options: statuses,
			table: {
				defaultValue: {
					summary: statuses[0],
				},
			},
		},
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		completedSteps: ['0'],
	},
}
