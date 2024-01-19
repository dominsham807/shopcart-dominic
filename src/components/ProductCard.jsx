import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const ProductCard = ({ products, gridList }) => {
    console.log(gridList)
    
    return (
        <div className={`shop-product-wrap row justify-content-center ${gridList ? "grid" : "list"}`}>
            {products.map((product, i) => (
                <div className="col-lg-4 col-md-6 col-12" key={i}>
                    <div className="product-item">
                        <div className="product-thumb">
                            <div className="pro-thumb">
                                <img src={`${product.img}`} alt={`${product.name}`} />
                            </div>
                            <div className="product-action-link">
                                <Link to={`/shop/${product._id}`}>
                                    <i className="icofont-eye"></i>
                                </Link>
                                <a href="#">
                                    <i className="icofont-heart"></i>
                                </a>
                                <Link to={`/cart`}>
                                    <i className="icofont-cart-alt"></i>
                                </Link>
                            </div>
                        </div>
                        <div className="product-content">
                            <Link to={`/shop/${product._id}`}>{product.name}</Link>
                            <p className="productRating">
                                <Rating rate={product.ratings} />
                            </p>
                            <h6>${product.price}</h6>
                            <p>Category: {product.category}</p>
                        </div>
                    </div>
                    <div className="product-list-item">
                        <div className="product-thumb">
                            <div className="pro-thumb">
                                <img src={`${product.img}`} alt={`${product.name}`} />
                            </div>
                            <div className="product-action-link">
                                <Link to={`/shop/${product._id}`}>
                                    <i className="icofont-eye"></i>
                                </Link>
                                <a href="#">
                                    <i className="icofont-heart"></i>
                                </a>
                                <Link to={`/cart`}>
                                    <i className="icofont-cart-alt"></i>
                                </Link>
                            </div>
                        </div>
                        <div className="product-content">
                            <Link to={`/shop/${product._id}`}>{product.name}</Link>
                            <p className="productRating">
                                <Rating rate={product.ratings} />
                            </p>
                            <h6>${product.price}</h6>
                            <p>Category: {product.category}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductCard