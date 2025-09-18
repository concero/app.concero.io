export type OmitTyped<Obj extends object, Keys extends keyof Obj> = Omit<Obj, Keys>
export type HintedString<KnownValues extends string, AllowedTemplate extends string = string> =
	| (AllowedTemplate & {})
	| KnownValues
