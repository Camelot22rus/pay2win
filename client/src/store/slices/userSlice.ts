import {createSlice} from '@reduxjs/toolkit'

const storageName = 'userData'

const data: {email: string, role: string, token: string, userId: string} = JSON.parse(localStorage.getItem('userData') || '{}')

const initialState = {
    userId: data.userId || null,
    token: data.token || null,
    role: data.role || null,
    email: data.email || null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.userId = action.payload.userId
            state.token = action.payload.token
            state.role = action.payload.role
            state.email = action.payload.email
            localStorage.setItem(storageName, JSON.stringify({
                userId: action.payload.userId,
                token: action.payload.token,
                role: action.payload.role,
                email: action.payload.email,
            }))
        },
        removeUser(state) {
            state.userId = null
            state.token = null
            state.role = null
            state.email = null
            localStorage.removeItem(storageName)
        },
    },
})

export const {setUser, removeUser} = userSlice.actions

export default userSlice.reducer