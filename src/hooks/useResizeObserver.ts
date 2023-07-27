import {useState, useEffect, RefObject} from 'react'

interface Dimensions {
  width: number
  height: number
}

const useResizeObserver = (ref: RefObject<HTMLElement>): Dimensions | null => {
  const [dimensions, setDimensions] = useState<Dimensions | null>(null)

  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') {
      console.warn('Der Browser unterstützt ResizeObserver nicht.')
      return
    }

    const currentRef = ref.current
    if (!currentRef) {
      return
    }

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const {width, height} = entry.contentRect
        setDimensions({width, height})
      }
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref])

  return dimensions
}

export default useResizeObserver
