import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { BACKEND_URL } from '../constants.js'
import PageHeader from '../components/PageHeader.jsx'
import ProductDisplay from '../components/ProductDisplay.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/reducers/cartReducer.js'
import toast from 'react-hot-toast'

// import { Swiper, SwiperSlide } from "swiper/react";
// // Import Swiper styles
// import "swiper/css";

// // import required modules
// import { Autoplay } from "swiper/modules";


const ShopProduct = () => {
    const { cartItems } = useSelector((state) => state.cartReducer)
    console.log(cartItems)

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    console.log(size)
    console.log(color)

    const { id } = useParams()

    const fetchSingleProduct = async() => {
        const { data } = await axios.get(`${BACKEND_URL}/api/products/${id}`)
        setProduct(data.product)
    }

    const path = useLocation()
    console.log(path?.pathname.split("/")[1])
    console.log(path?.pathname.split("/")[2])
    const dispatch = useDispatch()

    useEffect(() => {
        fetchSingleProduct()
        // dispatch(removeItem(product))
    }, [])
    console.log(product)

    const existingItem = cartItems.find((item) => 
        item._id === product._id 
    )
    console.log(existingItem)
    const productInCart = cartItems.findIndex((item) => 
        item._id === product._id 
    )
    console.log(productInCart)

    // console.log(existingItem.size)
    useEffect(() => {
        if(productInCart !== -1){
            setQuantity(existingItem.quantity)
            setSize(existingItem.size)
            setColor(existingItem.color)
        }
    }, [productInCart, existingItem])
   
    const handleDecrease = () => {
        if(quantity > 1){
            setQuantity(quantity - 1)
        } 
    }

    const handleIncrease = () => {
        setQuantity(quantity + 1)
    }

    const addToCartHandler = (e) => {
        e.preventDefault()
        dispatch(addToCart({ ...product, color: color, size: size, quantity: quantity }))
        toast.success("Product added to cart")
    }

    return (
        <div>
            <PageHeader title={`Product: ${product.name}`} parentPath={"Shop"} currentPage={"Single Product"} />
            <div className="shop-single padding-tb aside-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-12">

                        </div>
                        <div className="col-lg-8 col-12">
                            <article>
                             
                                <div className="product-details">
                                    <div className="row align-items-start">
                                        <div className="col-md-6 col-12">
                                            <div className="product-thumb">
                                                <div className="swiper-container pro-single-top">
                                                    {/* <Swiper 
                                                        spaceBetween={30} 
                                                        slidesPerView={1} 
                                                        loop={"true"}
                                                        autoplay={{
                                                            delay: 2000,
                                                            disableOnInteraction: false 
                                                        }}
                                                        modules={[Autoplay]}
                                                        navigation={{
                                                            prevEl: ".pro-single-prev",
                                                            nextEl: ".pro-single-next",
                                                        }}
                                                    >
                                                        <SwiperSlide> */}
                                                            <div className="single-thumb">
                                                                <img src={product.img} alt="" />
                                                            </div>
                                                        {/* </SwiperSlide>
                                                    </Swiper> */}
                                                    {/* <div className="pro-single-next">
                                                        <i className="icofont-rounded-left"></i>
                                                    </div>
                                                    <div className="pro-single-prev">
                                                        <i className="icofont-rounded-right"></i>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <div className="post-content">
                                                <div>
                                                    <ProductDisplay item={product} key={product._id} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <form className='product-form'>
                                            <div className="select-product-size">
                                                <select name="size" id="" value={size} onChange={(e) => setSize(e.target.value)}>
                                                    <option value="" >Select Size</option>
                                                    <option value="SM">SM</option>
                                                    <option value="MD">MD</option>
                                                    <option value="LG">LG</option>
                                                    <option value="XL">XL</option>
                                                    <option value="XXL">XXL</option>
                                                </select> 
                                            </div>

                                            <div className="select-product-color">
                                                <select name="color" id="" value={color} onChange={(e) => setColor(e.target.value)}>
                                                    <option value="">Select Color</option>
                                                    <option value="Pink">Pink</option>
                                                    <option value="Ash">Ash</option>
                                                    <option value="Red">Red</option>
                                                    <option value="White">White</option>
                                                    <option value="Blue">Blue</option>
                                                </select> 
                                            </div>

                                            <div className="cart-plus-minus">
                                                <div className="dec qtybutton" onClick={handleDecrease}>
                                                    -
                                                </div>
                                                <input type="text" className="cart-plus-minus-box" 
                                                name='qtybutton' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}/>
                                                <div className="inc qtybutton" onClick={handleIncrease}>
                                                    +
                                                </div>
                                            </div>
                                            {productInCart === -1 ? (
                                                <button className="lab-btn product-addToCart-btn" onClick={addToCartHandler}>
                                                    <span>Add To Cart</span>
                                                </button>
                                            ) : (
                                                <button className="lab-btn product-addToCart-btn">
                                                    <span>Update Cart</span>
                                                </button>
                                            )}
                                        </form>
                                    </div>
                                    <div className="row justify-content-center mt-4">
                                        <div className="discount-code">
                                            <input type="text" placeholder='Enter Coupon Code' />
                                        </div>  
                                    </div>
                                    <div className="row justify-content-center mt-4">
                                        <Link to="/cart" className="lab-btn bg-primary product-checkout-btn">
                                            <span className='text-center'>Check Out</span>
                                        </Link>
                                    </div>
                                </div>
                                
                              
                                <div className="review">

                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopProduct