export type OmitTyped<Obj extends object, Keys extends keyof Obj> = Omit<Obj, Keys>
