import {KBHeadings} from '@/types'
import {useState, useEffect, useRef, useCallback} from 'react'

type HeadingWithTop = {
  id: string
  top: number
}

const useTableOfContents = (tableOfContents: KBHeadings[]): string | null => {
  const [currentSection, setCurrentSection] = useState<string | null>(
    tableOfContents[0]?.id || null
  )

  const getHeadings = useCallback((toc: KBHeadings[]): HeadingWithTop[] => {
    const flattenedHeadings: KBHeadings[] = []

    function flattenToc(nodes: KBHeadings[]) {
      for (const node of nodes) {
        flattenedHeadings.push(node)
        flattenToc(node.children)
      }
    }

    flattenToc(toc)

    return flattenedHeadings
      .map(heading => {
        const el = document.getElementById(heading.id)
        if (!el) return null

        const style = window.getComputedStyle(el)
        const scrollMt = parseFloat(style.scrollMarginTop)

        const top = window.scrollY + el.getBoundingClientRect().top - scrollMt
        return {id: heading.id, top}
      })
      .filter((item): item is HeadingWithTop => item !== null)
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0) return
    const headings = getHeadings(tableOfContents)
    function onScroll() {
      const top = window.scrollY
      let current = headings[0]?.id
      for (let heading of headings) {
        if (top >= heading.top) {
          current = heading.id
        } else {
          break
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener('scroll', onScroll, {passive: true})
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [getHeadings, tableOfContents])

  return currentSection
}

export default useTableOfContents
