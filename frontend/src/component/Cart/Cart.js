import React, { Fragment } from 'react'
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
                        <div className='max-w-screen h-auto pt-20 sm:pt-16'>
                            <div className='w-full h-full'>
                                <div className='w-11/12 h-12 sm:h-8 flex bg-slate-100 mx-auto rounded-md'>
                                    <div className="w-8/12 sm:6/12 h-auto my-auto md:px-4 lg:px-4 xl:px-4 text-lef sm:text-xs md:text-sm sm:px-1">Product</div>
                                    <div className="w-2/12 sm:3/12 h-auto my-auto md:px-4 lg:px-4 xl:px-4 text-center sm:text-xs md:text-sm sm:px-1">Quantity</div>
                                    <div className="w-2/12 sm:3/12 h-auto my-auto md:px-4 lg:px-4 xl:px-4 text-right sm:text-xs md:text-sm sm:px-1">Subtotal</div>
                                </div>

                                {cartItems && cartItems.map((item) => (
                                    <div className="w-11/12 mx-auto my-3 sm:my-2 flex bg-white shadow-md shadow-slate-200/50 hover:scale-1005">
                                        <div className="w-8/12 sm:6/12">
                                            <CartItemCard item={item} deleteCartItems={deleteCartItems} key={item.product + item.name} />
                                        </div>
                                        <div className="w-2/12 sm:3/12 flex items-center justify-center">
                                            <div class="relative flex sm:flex-col items-center max-w-24">
                                                <button onClick={() => deccreaseQuantity(item.product, item.quantity)} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" class="hover:text-slate-900 text-slate-50 bg-main-red hover:border-2 hover:border-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all text-slate-50 w-8 h-8 sm:w-6 sm:h-6 focus:ring-gray-100 focus:ring-2 focus:outline-none flex items-center justify-center">
                                                    <svg class="w-3 h-3 sm:w-2 sm:h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                    </svg>
                                                </button>
                                                <input id="quantity-input" type="number" value={item.quantity} data-input-counter aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 text-center text-gray-900 text-sm sm:text-xs flex justify-center h-8 w-8 sm:w-6 sm:h-6" readOnly />
                                                <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} type="button" id="increment-button" data-input-counter-increment="quantity-input" class="hover:text-slate-900 text-slate-50 bg-main-red hover:border-2 hover:border-slate-500 hover:bg-slate-50 transition-all w-8 h-8 sm:w-6 sm:h-6 focus:ring-gray-100 focus:ring-2 focus:outline-none flex items-center justify-center">
                                                    <svg class="w-3 h-3 sm:w-2 sm:h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-2/12 sm:3/12 flex items-center justify-end">
                                            <p className="text-xl sm:text-xs font-medium pr-4 sm:pr-2 text-slate-800">{`₹${item.price * item.quantity}`}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="w-11/12 h-24 sm:h-16 mx-auto flex items-center justify-end border-t-2 border-slate-100 my-2">
                                    <div className="w-auto">
                                        <p className='px-4 sm:px-2 sm:text-sm'>Gross Total 
                                            <span className='px-2 text-main-red font-medium'>
                                                {`₹${cartItems.reduce(
                                                    (acc, item) => acc + item.quantity * item.price, 0
                                                )}`}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="w-auto">
                                        <button onClick={checkOutHandler} className='py-2 text-sm sm:text-xs bg-main-red hover:bg-slate-800 text-slate-100 hover:scale-105 md:px-4 lg:px-4 xl:px-4 sm:px-2'>Check Out</button>
                                    </div>
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
