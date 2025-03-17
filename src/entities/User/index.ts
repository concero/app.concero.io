export { userServiceApi } from './api/userApi'

export { getIsDoneQuest } from './model/lib/getIsDoneQuest'

export { invalidationTagUser } from './api/userApi'

export {
	useAddStepInProgressMutation,
	useAddQuestToProgressMutation,
	useUserByAddress,
	useUserVolume,
} from './api/userApi'
export { getIsStartedQuest } from './model/lib/getIsStartedQuest'
export { getCompletedStepsByQuest } from './model/lib/getCompletedStepsByQuest'
export type { TUserResponse } from './model/types/response'
