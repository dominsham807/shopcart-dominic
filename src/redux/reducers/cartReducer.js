import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    cartItems: [],
    color: "",
    size: "",
    subtotal: 0,
    shippingCharge: 0,
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
            if(state.cartItems[index].quantity < 10){
                state.cartItems[index].quantity += 1 
            } 
        },
        decrementItemQty: (state, action) => {
            console.log(action.payload)
            // console.log(state.cartItems)
            const index = state.cartItems.findIndex(
                (i) => i._id === action.payload._id
            )
            console.log(index)
            if(state.cartItems[index].quantity > 1){
                state.cartItems[index].quantity -= 1 
            } 
        },
        removeItem: (state, action) => {
            state.loading = true
            console.log(action.payload)
            state.cartItems = state.cartItems.filter(
                (i) => i._id !== action.payload._id
            )
            state.loading = false 
        },
        calculateSubtotals: (state) => {
            state.quantity = state.cartItems.reduce((qtyTotal, item) => {
                return qtyTotal + item.quantity
            }, 0)
            state.subtotal = state.cartItems.reduce((total, item) => {
                return total + item.quantity*item.price 
            }, 0)
            // console.log(state.subtotal > 0)
            if(state.subtotal < 1000){
                state.shippingCharge = 200
            } else{
                state.shippingCharge = 0
            }
            state.total = state.subtotal + state.shippingCharge
        },
        resetCart: (state) => {
            state.cartItems = []
        }
        // updateCart: (state, action) => {
        //     state.loading = true
        //     state.cartItems = action.payload
        //     state.loading = false 
        // }
    }
})

export const { addToCart, incrementItemQty, decrementItemQty, removeItem, calculateSubtotals, resetCart } = cartReducer.actions