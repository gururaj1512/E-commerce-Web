import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material'


const ProductCard = ({ product }) => {
    const options = {
        size: "small",
        value: product.ratings,
        precision: 0.5,
        readOnly: true,
    }
    return (
        <div className='m-4 rounded-md'>
            <Link className='productCard' to={`/product/${product._id}`}>
                <div className='relative'>
                    <div className=' rounded-md h-full w-full absolute top-0 right-0 hover:opacity-40 hover:bg-black'>
                    </div>
                    <img src={product.images[0].url} alt={product.name} className='w-full h-60 object-cover rounded-md' />
                </div>
                <p className='mt-2 text-sm text-semibold'>{product.name}</p>
                <span className='my-4 text-red-500 font-bold text-md'>{`₹${product.price}`}</span>
                <div className='reviewDetails flex items-center'>
                    <Rating {...options} /><span className='noOfReviews text-xs'>({product.numOfReviews} reviews)</span>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard;