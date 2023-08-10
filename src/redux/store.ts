import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useSelector} from 'react-redux'

import KBCompontentCounter from './kb/component-counter'
import AppTheme from './app/theme'

export const reduxStore = configureStore({
  reducer: {
    KBCompontentCounter,
    AppTheme
  }
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
