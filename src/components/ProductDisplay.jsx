import React, { useState } from 'react'
import Rating from './Rating'

const ProductDisplay = ({ item }) => {
    const { price, name, seller, quantity, ratings } = item
    const [preQuantity, setQuantity] = useState(quantity)

    const desc = "Energistia an deliver atactica metrcs after avsionary Apropria trnsition enterpris an sources applications emerging psd template.";

    console.log(preQuantity)

    return (
        <div>
            <div >
                <h4>{name}</h4>
                <p className="rating">
                    <Rating rate={ratings} /> (0 Reviews)
                </p>
                <h4>${price}</h4>
                <h6>Seller: {seller}</h6>
                <p className='product-description'>{desc}</p>
            </div>
            <div>
               
            </div>
        </div>
    )
}

export default ProductDisplay
