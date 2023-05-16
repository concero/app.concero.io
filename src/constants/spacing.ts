import spacingJson from './json/spacing.json'
import { NestedObj } from '../types/utils'

type SpacingKeys = keyof typeof spacingJson.sp
type Spacing = NestedObj<typeof spacingJson.sp, SpacingKeys>
export const sp = spacingJson.sp as Spacing
