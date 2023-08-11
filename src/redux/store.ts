import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import KBCompontentCounter from './kb/component-counter'
import AppTheme from './app/theme'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = {
  KBCompontentCounter,
  AppTheme: persistReducer(persistConfig, AppTheme)
}

export const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(reduxStore)

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
