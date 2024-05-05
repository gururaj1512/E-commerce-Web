import React, { Fragment } from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard.js'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction.js'
import { FaShoppingBag } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'


const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deccreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (quantity <= 1) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    }

    const checkOutHandler = () => {
        navigate('/login?redirect=shipping');
    }

    return (
        <Fragment>
            {
                cartItems.length === 0 ? (
                    <div className='noItemMessage'>
                        <FaShoppingBag />
                        <p>No products found. Please add products to cart</p>
                        <a href='/products'>Add Now</a>
                    </div>) : (
                    <Fragment>
                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>


                            {cartItems && cartItems.map((item) => (
                                <div className="cartContainer">
                                    <CartItemCard item={item} deleteCartItems={deleteCartItems} key={item.product + item.name} />
                                    <div className="cartInput">
                                        <button className="btn btnSign" onClick={() => deccreaseQuantity(item.product, item.quantity)} >-</button>
                                        <input type="number" value={item.quantity} readOnly />
                                        <button className="btn btnSign" onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} >+</button>
                                    </div>
                                    <p className="cartSubTotal">{`₹${item.price * item.quantity}`}</p>
                                </div>
                            ))}


                            <div className="cartGrossTotal">
                                <div></div>
                                <div className="cartGrossProfitBox">
                                    <p>Gross Total</p>
                                    <p>{`₹${cartItems.reduce(
                                        (acc, item) => acc + item.quantity * item.price, 0
                                    )}`}</p>
                                </div>
                                <div></div>
                                <div className="checkOutBtn">
                                    <button onClick={checkOutHandler}>Check Out</button>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default Cart
