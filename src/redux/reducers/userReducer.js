import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: true,
    user: null
}

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.loading = false
            state.user = null
        }
    }
})

export const { loginUser, logoutUser } = userReducer.actions