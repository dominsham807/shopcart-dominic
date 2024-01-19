import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Search from '../components/Search'
import axios from 'axios'
import { BACKEND_URL } from '../constants.js'
import ProductCard from '../components/ProductCard.jsx'
import Pagination from '../components/Pagination.jsx'
import ShopCategory from '../components/ShopCategory.jsx'

const Shop = () => {
    const [gridList, setGridList] = useState(true)
    const [products, setProducts] = useState([])
    const [categoryProducts, setCategoryProducts] = useState([])

    const [selectedCategory, setSelectedCategory] = useState("All")
    console.log(selectedCategory)

    const fetchAllProducts = async() => {
        const { data } = await axios.get(`${BACKEND_URL}/api/products`)
        setProducts(data.products)
    }

    const menuItems = [...new Set(products.map((product) => product.category))]
    console.log(menuItems)

    useEffect(() => {
        fetchAllProducts()
    }, [])

    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 9

    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = (indexOfLastProduct - productsPerPage) + 1
    const currentPageProducts = products.slice(
        indexOfFirstProduct - 1, 
        indexOfLastProduct
    )
    console.log(currentPageProducts)

    const paginate = (pageNum) => {
        setCurrentPage(pageNum)
    }
    
    const showResult = `Showing ${indexOfFirstProduct} to ${indexOfLastProduct} of ${products?.length} results`
    console.log(showResult)

    const filterItem = (currentCategory) => {
        const newItems = products.filter((product) => {
            return product.category === currentCategory
        })
        setSelectedCategory(currentCategory)
        setCategoryProducts(newItems)
    }
    console.log(categoryProducts)

    return (
        <div>
            <PageHeader title={"Our Shop"} currentPage={"Shop"} parentPath={null}/>
            {/* Shop Page */}
            <div className="shop-page padding-tb">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-12">
                            <aside>
                                <Search products={products} />
                                <ShopCategory filterItem={filterItem} setProducts={() => setSelectedCategory("All")} 
                                menuItems={menuItems} selectedCategory={selectedCategory}/>
                            </aside>
                        </div>
                        
                        <div className="col-lg-8 col-12">
                            <article>
                                <div className="shop-title d-flex flex-wrap justify-content-between">
                                    <p>{selectedCategory === "All" ? showResult : `Showing ${selectedCategory} products`}</p>
                                    <div className={`product-view-mode ${gridList ? "gridActive" : "listActive"}`}>
                                        <a className="grid" onClick={() => setGridList(!gridList)}>
                                            <i className="icofont-ghost"></i>
                                        </a>
                                        <a className="list" onClick={() => setGridList(!gridList)}>
                                            <i className="icofont-listine-dots"></i>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    {selectedCategory === "All" ? (
                                        <ProductCard products={currentPageProducts} gridList={gridList} />
                                    ): categoryProducts ? (
                                        <ProductCard products={categoryProducts} gridList={gridList} />
                                    ) : ""}
                             
                                </div>
                                {selectedCategory === "All" && (
                                    <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} activePage={currentPage} />
                                )}
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop