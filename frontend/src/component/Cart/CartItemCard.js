import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'


const CartItemCard = ({ item, deleteCartItems }) => {
    return (
        <Fragment>
            <div className="w-full h-24 sm:h-20 flex items-center justify-between px-2 sm:px-1">
                <div className='flex items-center'>
                    <img src={item.image} alt="" className='w-28 h-20 sm:h-16 sm:w-16 object-cover' />
                    <div className='ml-2'>
                        <Link className='text-sm xl:text-base sm:text-xs line-clamp-1' to={`http:localhost:3000/product/${item.product}`}>{item.name}</Link>
                        <div className="text-sm xl:text-base font-medium text-main-red">₹{item.price}</div>
                        <p className='cursor-pointer text-xs py-1 rounded-full hover:bg-slate-100 hover:text-main-red hidden sm:inline' onClick={() => deleteCartItems(item.product)}>Remove</p>
                    </div>
                </div>
                <div>
                    <p className='cursor-pointer text-sm xl:text-base px-2 py-1 rounded-full hover:bg-slate-100 hover:text-main-red sm:hidden' onClick={() => deleteCartItems(item.product)}>Remove</p>
                </div>
            </div>
        </Fragment>
    )
}

export default CartItemCard
