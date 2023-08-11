import {Theme} from '@/types'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
  theme: Theme.AUTO
}

export const theme = createSlice({
  name: 'app-theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
    }
  }
})

export const {setTheme} = theme.actions
export default theme.reducer
