// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Contra<T> = T extends any ? (arg: T) => void : never

type InferContra<T> = [T] extends [(arg: infer I) => void] ? I : never
type PickOne<T> = InferContra<InferContra<Contra<Contra<T>>>>

/**@example
 * type TSizes = 'a' | 'b'
 * const sizes: UnionToTuple<TSizes> = ['a', 'b'] - Correct
 * const sizes: UnionToTuple<TSizes> = ['a'] - Error
 * const sizes: UnionToTuple<TSizes> = ['a', 'b', 'a'] - Error
 * const sizes: UnionToTuple<TSizes> = ['a', 'a'] - Error
 */
export type UnionToTuple<T> =
	PickOne<T> extends infer U ? (Exclude<T, U> extends never ? [T] : [...UnionToTuple<Exclude<T, U>>, U]) : never
