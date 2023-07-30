import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useSelector} from 'react-redux'

import KBCompontentCounter from './kb/component-counter'

export const reduxStore = configureStore({
  reducer: {
    KBCompontentCounter
  }
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
