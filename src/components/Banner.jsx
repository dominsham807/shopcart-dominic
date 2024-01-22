import React, { useEffect, useState } from 'react'
import productData from "../products.json"
import SelectCategory from './SelectCategory'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../constants'

const title = (
    <h2>Search Your One From <span>Thousand</span> of Products</h2>
)
const desc = "We have the Largest Collection of Products"
const bannerList = [
    {
        iconName: "icofont-users-alt-4",
        text: "1.5 Million Customers",
    },
    {
        iconName: "icofont-notification",
        text: "More then 2000 Marchent",
    },
    {
        iconName: "icofont-globe",
        text: "Buy Anything Online",
    }
]

const Banner = () => {
    const [loading, setLoading] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [categories, setCategories] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const fetchCategories = async() => {
        try{
            setLoading(true)
            const { data } = await axios.get(`${BACKEND_URL}/api/products/categories`)
            console.log(data)
            setCategories(data.categories)
        } catch(error){
            console.log(error)
        }
    }

    const fetchAllProducts = async() => {
        try{
            setLoading(true)
            const { data } = await axios.get(`${BACKEND_URL}/api/products`)
            setFilteredProducts(data.products)
        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategories()
        fetchAllProducts()
    }, [])

    console.log(loading)
    console.log(categories)
    // console.log(filteredProducts)

    const handleSearch = (e) => { 
        const searchTerm = e.target.value 
        setSearchInput(searchTerm)

        const filtered = productData.filter((product) => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredProducts(filtered)
    }

    return (
        <div className='banner-section style-4'>
            <div className="container">
                <div className="banner-content">
                    {title}
                    <form>
                        <SelectCategory categories={categories} />
                        <input type='text' name='search' id='search' placeholder='Search your products' 
                        value={searchInput} onChange={handleSearch} />
                        <button type='submit'>
                            <i className="icofont-search"></i>
                        </button>
                    </form>
                    <p>{desc}</p>
                    <ul className="lab-ul">
                    {searchInput && filteredProducts.map((product, i) => (
                        <li key={i}>
                            <Link to={`/shop/${product.id}`}> {product.name}</Link>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Banner