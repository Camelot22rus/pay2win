import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import gamesReducer from './slices/gamesSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        games: gamesReducer,
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>