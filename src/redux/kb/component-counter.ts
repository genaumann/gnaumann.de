import {createSlice, PayloadAction} from '@reduxjs/toolkit'

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
    },
    resetComponent: () => {
      return initialState
    }
  }
})

export const {addComponent, resetComponent} = componentCounter.actions
export default componentCounter.reducer
