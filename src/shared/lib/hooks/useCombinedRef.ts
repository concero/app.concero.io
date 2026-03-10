import { useCallback } from 'react'

type CombinedRef<T> = ((instance: T | null) => void) | React.MutableRefObject<T | null> | null | undefined

/**
 * Used for combine refs
 * @example
 * const {outerRef} = props;
 * const innerRef = useRef();
 * const combinedRef = useCombinedRef(innerRef, outerRef)
 * ...
 * <Element ref={combinedRef}/>
 */
export const useCombinedRef = <T extends HTMLElement | null>(...refs: Array<CombinedRef<T>>) => {
	return useCallback(
		(element: T) => {
			refs.forEach(ref => {
				if (!ref) return

				if (typeof ref === 'function') {
					ref(element)
				} else {
					ref.current = element
				}
			})
		},
		[refs],
	)
}
