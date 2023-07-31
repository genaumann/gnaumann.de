'use client'

import {Provider} from 'react-redux'
import {reduxStore} from './store'
import {ChildProps} from '@/types'

const ReduxProvider = ({children}: ChildProps) => {
  const store = reduxStore
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
