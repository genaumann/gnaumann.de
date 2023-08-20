'use client'

import {useAppSelector} from '@/redux/store'
import {Theme} from '@/types'
import {useEffect, useState} from 'react'

const getOsMode = () => {
  return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.DARK
    : Theme.LIGHT
}

const useTheme = () => {
  const themeState = useAppSelector(state => state.AppTheme.theme)
  const [osMode, setOsMode] = useState<Theme>(getOsMode())
  const [theme, setTheme] = useState<Theme>(Theme.DARK)

  useEffect(() => {
    setTheme(themeState === Theme.AUTO ? osMode : themeState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeState])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
  }, [theme])

  useEffect(() => {
    const handler = () => setOsMode(getOsMode())
    const e = window.matchMedia('(prefers-color-scheme: dark)')
    e.addEventListener('change', handler)
    return () => e.removeEventListener('change', handler)
  }, [])

  return {theme, themeState}
}

export default useTheme
