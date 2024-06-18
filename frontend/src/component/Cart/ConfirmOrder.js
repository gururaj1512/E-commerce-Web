import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import CheckoutSteps from './CheckoutSteps'
import MetaData from '../layout/MetaData'
import { Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'


const ConfirmOrder = () => {

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate()

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price, 0
    )
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18

    const totalPrice = subtotal + tax + shippingCharges;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`

    const proceedToPayment = () => {
        const data = {
            subtotal, shippingCharges, tax, totalPrice
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate('/process/payment')
    }

    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <div className="w-screen max-w-screen pt-20 sm:pt-16">
                <CheckoutSteps activeStep={1} />
                <div className='flex mt-6 sm:mt-2 sm:flex-col'>
                    <div className='w-1/2 sm:w-11/12 md:2/3 mx-4 pl-10 md:pl-10 sm:pl-0'>
                        <div className="w-full my-4">
                            <Typography variant='h6'>Shipping Info</Typography>
                            <div className="pl-5 pt-2 sm:pl-3 sm:pt-1">
                                <p className='text-sm sm:text-xs'>Name: {user.name}</p>
                                <p className='text-sm sm:text-xs'>Phone: {shippingInfo.phoneNo}</p>
                                <p className='text-sm sm:text-xs'>Address: {address}</p>
                            </div>
                        </div>
                        <div className="w-full my-4">
                            <Typography variant='h6'>Your Cart Items:</Typography>
                            <div className='overflow-y-scroll max-h-24'>
                                {cartItems && cartItems.map((item) => (
                                    <Link to={`/product/${item.product}`} key={item.product}>
                                        <div key={item.product} className='w-full h-20 flex items-center justify-between sm:justify-around my-2 px-10 md:px-5 sm:px-2'>
                                            <img src={item.image} alt="Product" className='h-20' />
                                            <div className='sm:text-sm'>
                                                <div className='text-right'>
                                                    {item.name}
                                                </div>
                                                <div className='text-right'>
                                                    {item.quantity} X ₹{item.price} ={" "}
                                                    <b>₹{item.price * item.quantity}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 flex flex-col sm:w-11/12 mx-auto xl:border-l-2 lg:border-l-2 md:border-l-2 sm:border-t-2 border-slate-800'>
                        <div className="mx-5 w-11/12">
                            <Typography variant='h6' sx={{ textAlign: 'center', margin: '10px 0' }}>Order Summery</Typography>
                            <div className='flex items-center justify-between'>
                                <div className='text-sm sm:text-xs'>
                                    <p>Subtotal: ₹{subtotal}</p>
                                    <p>Shipping Charges: ₹{shippingCharges}</p>
                                    <p>GST: ₹{tax}</p>
                                </div>
                                <div className="">
                                    <p><b>Total:</b></p>
                                    <span>₹{totalPrice}</span>
                                </div>
                            </div>
                        </div>
                        <button className='mx-auto w-1/3 text-sm text-slate-100 bg-main-red hover:bg-slate-800 py-2 rounded-md transition-all duration-300 my-5' onClick={proceedToPayment}>Pay ₹{totalPrice}</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder
