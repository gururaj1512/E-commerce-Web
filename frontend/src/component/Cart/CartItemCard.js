import React, { Fragment } from 'react'
import './CartItmeCard.css'
import {Link} from 'react-router-dom'


const CartItemCard = ({ item, deleteCartItems }) => {
    return (
        <Fragment>
            <div className="cartItemCard">
                <img src={item.image} alt="" />
                <div className='cartItemCardDetails'>
                    <Link to={`product/${item.product}`}>{item.name}</Link>
                    <span className="itemPrice">{item.price}</span>
                    <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
                </div>
            </div>
        </Fragment>
    )
}

export default CartItemCard
