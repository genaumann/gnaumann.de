import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../store'

interface InitialState {
  value: 0
  componentIds: Record<string, number>
}

const initialState = {
  value: 0,
  componentIds: {}
} as InitialState

export const componentCounter = createSlice({
  name: 'kb-cc',
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<string>) => {
      state.componentIds[action.payload] = state.value++
    }
  }
})

export const {addComponent} = componentCounter.actions
export default componentCounter.reducer
