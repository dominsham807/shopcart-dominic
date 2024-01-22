import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import delImgUrl from "../assets/images/shop/del.png"
import CheckoutModal from '../components/CheckoutModal'
import { decrementItemQty, incrementItemQty, removeItem } from '../redux/reducers/cartReducer.js'
import toast from 'react-hot-toast'

const Cart = () => {
    const [updateCartItems, setUpdateCartItems] = useState([])
    const [shippingCharge, setShippingCharge] = useState(200)
    const [coupon, setCoupon] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")

    const dispatch = useDispatch()

    const { cartItems, loading: cartLoading } = useSelector((state) => state.cartReducer)
    console.log(cartItems)

    useEffect(() => {
        setUpdateCartItems(cartItems)
    }, [cartItems])

    console.log(updateCartItems)

    const cartSubtotal = cartItems.reduce((total, item) => {
        return total + item.quantity*item.price 
    }, 0)

    // const handleUpdateCart = (e) => {
    //     e.preventDefault()

    //     dispatch(updateCart(updateCartItems))
    //     toast.success("Cart has been updated")
    // }

    const incrementHandler = (item) => {
        dispatch(incrementItemQty(item))
    }

    const decrementHandler = (item) => {
        dispatch(decrementItemQty(item))
    }

    const deleteItemHandler = (item) => {  
        dispatch(removeItem(item))
        toast.success("Item removed from cart")
    }

    return (
        <div>
            <PageHeader title={"Shop"} parentPath={""} currentPage={"Cart"} />
            <div className="shop-cart padding-tb">
                <div className="container">
                    <div className="section-wrapper">
                        <div className="cart-top">
                            <table className='table-striped'>
                                <thead>
                                    <tr>
                                        <th className="cat-image text-center">Image</th>
                                        <th className="cat-name text-center">Name</th>
                                        <th className="cat-price text-center">Price</th>
                                        <th className="cat-quantity text-center">Quantity</th>
                                        <th className="cat-toprice text-center">Total</th>
                                        <th className="cat-edit text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems?.map((item, index) => {
                                        // const [itemQty, setItemQty] = useState(item.quantity)
                                        // console.log(itemQty)
                                        // // setUpdateCartItems({...item, quantity: itemQty})
                                        const totalPrice = item.price * item.quantity
                                        // console.log(totalPrice)

                                        // const handleIncrease = () => {
                                        //     if(itemQty < 10){
                                        //         setItemQty(itemQty + 1)

                                        //         // dispatch(updateCartItemQuantity({...item, quantity: itemQty + 1}))
                                        //         let newCartItems = updateCartItems.map((cartItem) => {
                                        //             if(cartItem._id === item._id) {
                                        //                 return {...item, quantity: itemQty + 1 }
                                        //             }
                                        //             return cartItem
                                        //         })
                                        //         setUpdateCartItems(newCartItems)
                                        //         // const newData = updateCartItems.find((cartItem) => {
                                        //         //     return cartItem.quantity === item.quantity + 1
                                        //         // })
                                        //         // console.log(newData)
                                        //         // const otherItems = original
                                        //         // otherItems.push({...item, quantity: itemQty + 1 })
                                        //         // console.log(otherItems)
                                        //         // setUpdateCartItems(otherItems)
                                        //         // console.log(itemQty) 
                                        //     }  
                                        // }
                                        
                                        // // console.log(updateCartItems)
                                        // const handleDecrease = () => {
                                        //     console.log(itemQty)
                                        //     if(itemQty > 1){
                                        //         setItemQty(itemQty - 1)
                                        //         let newCartItems = updateCartItems.map((cartItem) => {
                                        //             if(cartItem._id === item._id) {
                                        //                 return {...item, quantity: itemQty - 1 }
                                        //             }
                                        //             return cartItem
                                        //         })
                                        //         setUpdateCartItems(newCartItems)
                                        //         // console.log(itemQty)
                                        //     }
                                        // } 

                                        return (
                                            <tr key={index}>
                                                <td className="product-item cat-product">
                                                    <div className="p-thumb">
                                                        {/* <Link to={`/shop/${item._id}`}> */}
                                                        <img src={item.img} alt="" />
                                                        {/* </Link> */}
                                                    </div> 
                                                </td>
                                                <td className="cat-product">
                                                    <div className="p-content text-center">
                                                        <Link to={`/shop/${item._id}`}> 
                                                            {item.name}
                                                        </Link>
                                                    </div> 
                                                </td>
                                                <td className="cat-price">
                                                    <div className="p-content text-center">
                                                        ${item.price}
                                                    </div> 
                                                </td>
                                                <td className="cat-quantity">
                                                    <div className="p-content text-center">
                                                        <div className="cart-plus-minus">
                                                            <div className="dec qtybutton" 
                                                                onClick={() => {
                                                                    // setItemQty(item.quantity - 1)
                                                                    decrementHandler(item)
                                                                }}
                                                            >
                                                                - 
                                                            </div>
                                                            <input type="text" className="cart-plus-minus-box" 
                                                                name='qtybutton' value={item.quantity} 
                                                                onChange={() => {}}
                                                                // onChange={(e) => setItemQty(parseInt(e.target.value))}
                                                            />
                                                            <div className="inc qtybutton" 
                                                                onClick={() => {
                                                                    // setItemQty(item.quantity + 1)
                                                                    incrementHandler(item)
                                                                }}
                                                            >
                                                                + 
                                                            </div>
                                                        </div> 
                                                    </div> 
                                                </td>
                                                <td className="cat-total">
                                                    <div className="p-content text-center">
                                                        ${totalPrice}
                                                    </div> 
                                                </td>
                                                <td className="cat-edit">
                                                    <div className="p-content text-center"> 
                                                        <div onClick={() => deleteItemHandler(item)}>
                                                            <img src={delImgUrl} alt="Remove Image" className='remove-item-img' /> 
                                                        </div> 
                                                    </div> 
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="cart-bottom">
                            <div className="cart-checkout-box">
                                <form className="coupon">
                                    <input type="text" name='coupon' placeholder='Coupon Code...' 
                                    className='cart-page-input-text' value={coupon} onChange={(e) => setCoupon(e.target.value)}/>
                                    <input type="submit" value="Apply Coupon" />
                                </form> 
                                <form action="/" className="cart-checkout">
                                    {/* <button className='px-5' onClick={()=>{}}>Update Cart</button> */}
                                    <div className='checkout-modal'>
                                        <CheckoutModal />
                                    </div>
                                </form>
                            </div>
                            <div className="shipping-box">
                                <div className="row">
                                    <h3 className='py-2'>Shipping</h3>
                                    <div className="col-md-6 col-12">
                                        <div className="calculate-shipping">
                                         
                                            <div className="outline-select shipping-select">
                                                <select value={state} onChange={(e) => setState(e.target.value)}>
                                                    <option value="">Select Country / State</option>
                                                    <option value="hksar">HKSAR</option>
                                                    <option value="china">China</option>
                                                    <option value="japan">Japan</option>
                                                </select>
                                                <span className="select-icon">
                                                    <i className="icofont-rounded-down"></i>
                                                </span>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <input type="text" name='zip' placeholder='Postcode / ZIP code' value={zipCode}
                                        className='cart-page-input-text' onChange={(e) => setZipCode(e.target.value)}/> 
                                    </div>
                                </div>
                              
                                <div className="row">
                                    <div className="col-12">
                                        <div className="cart-overview py-2">
                                            <h3>Cart Total</h3>
                                            <ul className="lab-ul">
                                                <li>
                                                    <span className="pull-left">Subtotal</span>
                                                    <p className="pull-right">${cartSubtotal}</p>
                                                </li>
                                                <li>
                                                    <span className="pull-left">Shipping and Handling</span>
                                                    <p className="pull-right">{cartSubtotal > 1000 ? 0 : `$${shippingCharge}`}</p>
                                                </li>
                                                <li>
                                                    <span className="pull-left">Cart Total</span>
                                                    <p className="pull-right">${cartSubtotal + shippingCharge}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart