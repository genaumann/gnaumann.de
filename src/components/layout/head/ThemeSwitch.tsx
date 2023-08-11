'use client'

import useTheme from '@/hooks/useTheme'
import {setTheme} from '@/redux/app/theme'
import {AppDispatch} from '@/redux/store'
import {Theme} from '@/types'
import {
  faMoon,
  faSunBright,
  faWandMagicSparkles
} from '@fortawesome/pro-regular-svg-icons'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import {useDispatch} from 'react-redux'

type ThemeSwitchProps = Omit<FontAwesomeIconProps, 'icon'>

const ThemeSwitch = ({...props}: ThemeSwitchProps) => {
  const {themeState} = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const switchIcons = () => {
    switch (themeState) {
      case 'dark':
        return (
          <FontAwesomeIcon
            {...props}
            onClick={() => dispatch(setTheme(Theme.LIGHT))}
            icon={faMoon}
            aria-label="Wechsel zum Lightmode"
            title="Wechsel zum Lightmode"
            {...props}
          />
        )
      case 'light':
        return (
          <FontAwesomeIcon
            {...props}
            onClick={() => dispatch(setTheme(Theme.AUTO))}
            icon={faSunBright}
            aria-label="Wechsel zum Automode"
            title="Wechsel zum Automode"
            {...props}
          />
        )
      case 'auto':
        return (
          <FontAwesomeIcon
            {...props}
            onClick={() => dispatch(setTheme(Theme.DARK))}
            icon={faWandMagicSparkles}
            aria-label="Wechsel zum Darkmode"
            title="Wechsel zum Darkmode"
          />
        )
    }
  }
  return <>{switchIcons()}</>
}

export default ThemeSwitch
