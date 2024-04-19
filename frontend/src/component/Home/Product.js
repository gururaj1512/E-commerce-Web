import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import './Product.css'


const Product = ({ product }) => {
    const options = {
        edit: false,
        color: "aliceblue",
        acticeColor: "#ff5e14",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }
    return (
        <div className=''>
            <Link className='productCard' to={`/product/${product._id}`}>
                <img src={product.images[0].url} alt={product.name} />
                <p>{product.name}</p>
                <div>
                    <ReactStars {...options} /><span>({product.numOfReviews} reviews)</span>
                </div>
                <span>{`₹${product.price}`}</span>
            </Link>
        </div>
    )
}

export default Product
