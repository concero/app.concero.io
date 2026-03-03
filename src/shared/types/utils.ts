export type OmitTyped<Obj extends object, Keys extends keyof Obj> = Omit<Obj, Keys>
export type HintedString<KnownValues extends string, AllowedTemplate extends string = string> =
	| (AllowedTemplate & {})
	| KnownValues
export type Nullable<T> = T | null
export type TupleOfKeys<T> = T extends readonly (infer K)[] ? K : never
export type Union<T extends string | number | boolean> = `${T}`
