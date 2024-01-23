import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from '../components/PageHeader'
import { Link, useNavigate } from 'react-router-dom'
import delImgUrl from "../assets/images/shop/del.png"
import CheckoutModal from '../components/CheckoutModal'
import { FaPen } from "react-icons/fa";
import { calculateSubtotals, decrementItemQty, incrementItemQty, removeItem, resetCart } from '../redux/reducers/cartReducer.js'
import toast from 'react-hot-toast'
import axios from 'axios'

const Cart = () => {
    const [updateCartItems, setUpdateCartItems] = useState([])
    const [address, setAddress] = useState("")
    const [coupon, setCoupon] = useState("")
    const [state, setState] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [availableCoupons, setAvailableCoupons] = useState([])
    const [isValidCoupon, setIsValidCoupon] = useState(false)

    console.log(availableCoupons)
    console.log(isValidCoupon)
    // console.log(coupon)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartItems, quantity, shippingCharge, subtotal, total, loading } = useSelector((state) => state.cartReducer)
    console.log(cartItems)
    // console.log(subtotal)
    
    useEffect(() => {
        setUpdateCartItems(cartItems)
    }, [cartItems])

    console.log(updateCartItems)

    useEffect(() => {
        dispatch(calculateSubtotals())
    },[])

    useEffect(() => {
        const getCoupons = async() => {
            const res = await axios.get("http://localhost:8000/api/payment/coupon")
            setAvailableCoupons(res.data.coupons)
        }
        getCoupons()
    }, [])
    // const cartSubtotal = cartItems.reduce((total, item) => {
    //     return total + item.quantity*item.price 
    // }, 0)

    // const handleUpdateCart = (e) => {
    //     e.preventDefault()

    //     dispatch(updateCart(updateCartItems))
    //     toast.success("Cart has been updated")
    // }

    const incrementHandler = (item) => {
        dispatch(incrementItemQty(item))
        dispatch(calculateSubtotals())
    }

    const decrementHandler = (item) => {
        dispatch(decrementItemQty(item))
        dispatch(calculateSubtotals())
    }

    const deleteItemHandler = (item) => {  
        dispatch(removeItem(item))
        toast.success("Item removed from cart")
    }

    const clearHandler = () => {
        dispatch(resetCart())
        navigate("/shop")
    }

    const handleCoupon = async(e) => {
        e.preventDefault()
        

        const existingCoupon = availableCoupons.findIndex((availableCoupon) => {  
            availableCoupon.code === coupon
        })
        console.log(existingCoupon)

        if(existingCoupon !== -1){
            setIsValidCoupon(true)
        } else{
            setIsValidCoupon(false)
        }
    }

    return (
        <div>
            <PageHeader title={"Cart"} parentPath={""} currentPage={"Cart"} />
            <div className="shop-cart padding-tb">
                <div className="container">
                    <div className="section-wrapper">
                        <div className="cart-top">
                            <table className='table-striped'>
                                <thead>
                                    <tr>
                                        <th className="cat-image text-center">Image</th>
                                        <th className="cat-name text-center">Name</th>
                                        <th className="cat-name text-center">Size</th>
                                        <th className="cat-name text-center">Color</th>
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
                                                <td className="cat-size">
                                                    <div className="p-content text-center">
                                                        {item.size}
                                                    </div> 
                                                </td>
                                                <td className="cat-color">
                                                    <div className="p-content text-center">
                                                        {item.color}
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
                                                                name='qtybutton' value={item.quantity} max={"10"}
                                                                readOnly
                                                                // onChange={() => {}}
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
                                                {/* <td className="cat-actions">
                                                    <div className="p-content text-center"> 
                                                        <Link to={`/shop/${item._id}`}>
                                                            <FaPen size={20} />
                                                        </Link> 
                                                    </div> 
                                                </td> */}
                                                <td className="cat-delete">
                                                    <div className="p-content text-center"> 
                                                        <div onClick={() => deleteItemHandler(item)}>
                                                            <img src={delImgUrl} alt="Remove Image" className='remove-item-img' height={20}/> 
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
                            
                            <div className="shipping-box">
                                
                                <div className="row">
                                    <div className="col-12">
                                        <div className="cart-overview py-2">
                                            <h3>Cart Total</h3>
                                            <ul className="lab-ul">
                                                <li>
                                                    <span className="pull-left">Total No. of Items</span>
                                                    <p className="pull-right">{quantity}</p>
                                                </li>
                                                <li>
                                                    <span className="pull-left">Subtotal</span>
                                                    <p className="pull-right">${subtotal}</p>
                                                </li>
                                                <li>
                                                    <span className="pull-left">Shipping and Handling</span>
                                                    <p className="pull-right">${subtotal !== 0 ? shippingCharge : 0}</p>
                                                </li>
                                                <li>
                                                    <span className="pull-left">Cart Total</span>
                                                    <p className="pull-right">${subtotal !== 0 ? total : 0}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
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
                                        className='cart-page-input-text px-3' onChange={(e) => setZipCode(e.target.value)}/> 
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <input type="text" name='address' placeholder='Address' value={address}
                                        className='cart-page-input-text px-3' onChange={(e) => setAddress(e.target.value)}/> 
                                    </div>
                                </div>
                                <div className="cart-checkout-box">
                                    <div className="col-md-6 col-12">
                                        <form className="coupon" onSubmit={handleCoupon}>
                                            <input type="text" name='coupon' placeholder='Coupon Code...' 
                                            className='cart-page-input-text' value={coupon} onChange={(e) => setCoupon(e.target.value)}/>
                                            <input type="submit" value="Apply Coupon" />
                                        </form>
                                        {isValidCoupon && (
                                            <strong>{coupon} applied</strong>
                                        )}
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <form action="/" className="cart-checkout">
                                            <button className='px-5 py-2 btn btn-danger' onClick={()=>{clearHandler()}}>Clear Cart</button>
                                            <div className='checkout-modal'>
                                                <CheckoutModal />
                                            </div>
                                        </form>
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