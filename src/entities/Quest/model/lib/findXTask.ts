import { TQuest, TQuestTask } from '../types/response'

export const findXTask = ({ quest }: { quest: TQuest }): TQuestTask | null =>
	quest.tasks.find(task => task.type == 'retweet_x') ?? null
