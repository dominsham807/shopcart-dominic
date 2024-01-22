import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    cartItems: [],
    subtotal: 0,
    shippingCharges: 0,
    discount: 0,
    quantity: 0,
    total: 0,
}

export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.loading = true
            const index = state.cartItems.findIndex(
                (i) => i._id === action.payload._id
            )
            console.log(index)
            if(index === -1){
                state.cartItems.push({ ...action.payload })
            } else{
                state.cartItems[index] = action.payload 
            }
            state.loading = false
        },
        incrementItemQty: (state, action) => {
            console.log(action.payload)
            // console.log(state.cartItems)
            const index = state.cartItems.findIndex(
                (i) => i._id === action.payload._id
            )
            console.log(index)
            state.cartItems[index].quantity += 1 
        },
        decrementItemQty: (state, action) => {
            console.log(action.payload)
            // console.log(state.cartItems)
            const index = state.cartItems.findIndex(
                (i) => i._id === action.payload._id
            )
            console.log(index)
            state.cartItems[index].quantity -= 1 
        },
        removeItem: (state, action) => {
            state.loading = true
            console.log(action.payload)
            state.cartItems = state.cartItems.filter(
                (i) => i._id !== action.payload._id
            )
            state.loading = false 
        }
        // updateCart: (state, action) => {
        //     state.loading = true
        //     state.cartItems = action.payload
        //     state.loading = false 
        // }
    }
})

export const { addToCart, incrementItemQty, decrementItemQty, removeItem } = cartReducer.actions