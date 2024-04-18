import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import './Product.css'



const Product = ({ product }) => {
    return (
        <div>
            <Link className='productCard' to={product._id}>
                
            </Link>
        </div>
    )
}

export default Product
