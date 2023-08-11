'use client'

import {Provider} from 'react-redux'
import {reduxStore, persistor} from './store'
import {ChildProps} from '@/types'
import {PersistGate} from 'redux-persist/integration/react'

const ReduxProvider = ({children}: ChildProps) => {
  const store = reduxStore
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  )
}

export default ReduxProvider
