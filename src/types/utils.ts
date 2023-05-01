export type NestedObj<TObj, TKey extends keyof TObj> = {
  [key in TKey]: TObj[key] extends Record<string, unknown> ? NestedObj<TObj[key], keyof TObj[key]> : string
}
