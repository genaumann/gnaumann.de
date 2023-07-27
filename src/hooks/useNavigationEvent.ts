'use client'

import {usePathname, useSearchParams} from 'next/navigation'
import {useEffect} from 'react'

export const useNavigationEvent = (onPathnameChange: () => void) => {
  const pathname = `${usePathname()}`
  const searchParams = useSearchParams()

  useEffect(() => {
    onPathnameChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams])
}
