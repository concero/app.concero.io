import { useEffect, useState } from 'react'

export const sizes = {
  mobile: '768px',
}

export const useMediaQuery = (screen: 'mobile') => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const query = `(min-width: ${sizes[screen]})`
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [matches, screen])

  return matches
}
