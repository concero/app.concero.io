import { z } from 'zod'
import { TQuest, TQuestTask } from '../types/response'
import { taskTypeSchema } from '../validations/task'

type Types = z.infer<typeof taskTypeSchema>

export const findXTask = ({ quest }: { quest: TQuest }): TQuestTask | null => {
	const types: Types[] = ['like_x', 'retweet_x', 'follow_x']
	return quest.tasks.find(task => types.includes(task.type)) ?? null
}
