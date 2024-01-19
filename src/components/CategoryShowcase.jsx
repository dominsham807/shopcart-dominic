import React, { useEffect, useState } from 'react'
import Rating from './Rating';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../constants.js';

const title = "Our Products";

const ProductData = [
    {
        imgUrl: 'src/assets/images/categoryTab/01.jpg',
        cate: 'Shoes',
        title: 'Nike Premier X',
        author: 'assets/images/course/author/01.jpg',
        brand: 'Nike',
        price: '$199.00',
        id: 1,
    },
    {
        imgUrl: 'src/assets/images/categoryTab/02.jpg',
        cate: 'Bags',
        title: 'Asthetic Bags',
        author: 'assets/images/course/author/02.jpg',
        brand: 'D&J Bags',
        price: '$199.00',
        id: 2,
    },
    {
        imgUrl: 'src/assets/images/categoryTab/03.jpg',
        cate: 'Phones',
        title: 'iPhone 12',
        author: 'src/assets/images/categoryTab/brand/apple.png',
        brand: 'Apple',
        price: '$199.00',
        id: 3,
    },
    {
        imgUrl: 'src/assets/images/categoryTab/04.jpg',
        cate: 'Bags',
        title: 'Hiking Bag 15 Nh100',
        author: 'assets/images/course/author/04.jpg',
        brand: 'Gucci',
        price: '$199.00',
        id: 4,
    },
    {
        imgUrl: 'src/assets/images/categoryTab/05.jpg',
        cate: 'Shoes',
        title: 'Outdoor Sports Shoes',
        author: 'assets/images/course/author/05.jpg',
        brand: 'Nike',
        price: '$199.00',
        id: 5,
    },
    {
        imgUrl: 'src/assets/images/categoryTab/06.jpg',
        cate: 'Beauty',
        title: 'COSRX Snail Mucin',
        author: 'assets/images/course/author/06.jpg',
        brand: 'Zaara',
        price: '$199.00',
        id: 6,
    },
    {
        imgUrl: 'src/assets/images/categoryTab/07.jpg',
        cate: 'Bags',
        title: 'Look Less Chanel Bag ',
        author: 'assets/images/course/author/01.jpg',
        brand: 'Gucci',
        price: '$199.00',
        id: 7,
    },
    {
        imgUrl: 'src/assets/images/categoryTab/08.jpg',
        cate: 'Shoes',
        title: 'Casual Sneakers',
        author: 'assets/images/course/author/02.jpg',
        brand: 'Bata',
        price: '$199.00',
        id: 8,
    },
]

const CategoryShowcase = () => {
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])

    console.log(loading)

    const fetchAllProducts = async() => {
        setLoading(true)
        const { data } = await axios.get(`${BACKEND_URL}/api/products`)
        setItems(data.products)
        setLoading(false)
    }
    
    const fetchAllCategories = async() => {
        setLoading(true)
        const { data } = await axios.get(`${BACKEND_URL}/api/products/categories`)
        setCategories(data.categories)
        setLoading(false)
    }
    console.log(categories)

    const filterItem = async(categoryItem) => {
        const { data } = await axios.get(`${BACKEND_URL}/api/products/categories/${categoryItem}`)
        console.log(data.categoryProducts)
        setItems(data.categoryProducts)
        // const updateItems = ProductData.filter((curElem) => {
        //     return curElem.cate === categoryItem 
        // })
        // setItems(updateItems)
    }
    
    console.log(items)

    useEffect(() => {
        fetchAllCategories()
        fetchAllProducts()
    }, [])

    return (
        <div className='course-section style-3 padding-tb'>
            <div className="course-shape one"><img src="/src/assets/images/shape-img/icon/01.png" alt="education" /></div>
            <div className="course-shape two"><img src="/src/assets/images/shape-img/icon/02.png" alt="education" /></div>
            <div className="container">
                {/* Section header */}
                <div className="section-header">
                    <h2 className="title">{title}</h2>
                    <div className="course-filter-group">
                        <ul className="lab-ul">
                            {categories && categories?.map((category, i) => (
                                <li key={i} onClick={() => filterItem(category)}>{category}</li>
                            ))}
                            {/* <li onClick={() => setItems(ProductData)}>All</li>
                            <li onClick={() => filterItem("Shoes")}>Shoes</li>
                            <li onClick={() => filterItem('Bags') }>Bags</li>
                            <li onClick={() => filterItem('Phones')}>Phones</li>
                            <li onClick={() => filterItem('Beauty')}>Beauty</li> */}
                        </ul>
                    </div>
                </div>

                {/* Section body */}
                <div className="section-wrapper">
                    <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 course-filter">
                        {items.slice(0,8).map((item, index) => {
                            const { img, category, name, seller, price, ratings } = item 

                            return (
                                <div className="col" key={index}>
                                    <div className="course-item style-4">
                                        <div className="course-inner">
                                            <div className="course-thumb">
                                                <img src={img} alt={name} />
                                                <div className="course-category">
                                                    <div className="course-cate">
                                                        <a href="#">{category}</a>
                                                    </div>
                                                    <div className="course-review">
                                                        <Rating rate={ratings}/>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Content */}
                                            <div className="course-content">
                                                <Link to={'/course-single'}>
                                                    <h5>{name}</h5>
                                                </Link>
                                                <div className="course-footer">
                                                    <div className="course-author">
                                                        <Link to={"/team-single"} className='ca-name'>{seller}</Link>
                                                    </div>
                                                    <div className="course-price">${price}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryShowcase