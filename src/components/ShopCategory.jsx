import React from 'react'

const ShopCategory = ({ filterItem, menuItems, setProducts, selectedCategory }) => {
    const title = "All Categories";
    console.log(menuItems)

    return (
        <>
        <div className="widget-header">
            <h5 className="ms-2">{title}</h5>
        </div>
        <div>
            <button className={`m-2 ${selectedCategory === "All" ? 'bg-warning' : ''}`} onClick={setProducts}>
                All
            </button>
            {menuItems.map((item, id) => {
                return (
                    <button className={`m-2 ${selectedCategory === item ? 'bg-warning' : ''}`} onClick={() => filterItem(item)} key={id}>
                        {item}
                    </button>
                )
            })}
        </div>
        </>
    )
}

export default ShopCategory