import { z } from 'zod'

export const Nullable = <T extends z.ZodTypeAny>(type: T) => type.nullable()
