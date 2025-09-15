import React, { useEffect, useState } from 'react'
import API from "../api/API"

const Products = () => {

    const [productsData, setProductsData] = useState([]) || null;

    useEffect(async () => {

        try {
            const res = await API.get("/products");

            if(res.status === 200)
                setProductsData(res.data)
        }
        catch (err) {
            console.log(err.message);
        }

    })

    return (
        <div>Products</div>
    )
}

export default Products