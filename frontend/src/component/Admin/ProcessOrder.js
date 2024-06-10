import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import { getOrderDetails, clearErrors, updateOrder } from '../../actions/orderAction.js'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader/Loader.js'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants.js'


const ProcessOrder = () => {

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const navigate = useNavigate()
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState("")
    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set("status", status);

        dispatch(updateOrder(id, myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Order updated successfully");
            dispatch({type : UPDATE_ORDER_RESET});
        }
        dispatch(getOrderDetails(id))
    }, [dispatch, error, updateError, alert , id, isUpdated, navigate])

    return (
        <Fragment>
            <MetaData title={'Process Order'}></MetaData>
            <div>
                {loading ? <Loader /> : (
                    <div className='h-screen w-screen pt-20 flex'>
                        <Sidebar />
                        <div className="w-4/5 sm:w-3/4 overflow-y-scroll justify-center">
                            <div className="confirmOrderPage">
                                <div>
                                    <div className="confirmshippingArea">
                                        <Typography>Shipping Info</Typography>
                                        <div className="orderDetailsContainerBox">
                                            <div>
                                                <p>Name:</p>
                                                <span>{order.user && order.user.name}</span>
                                            </div>
                                            <div>
                                                <p>Phone:</p>
                                                <span>
                                                    {order.shippingInfo && order.shippingInfo.phoneNo}
                                                </span>
                                            </div>
                                            <div>
                                                <p>Address:</p>
                                                <span>
                                                    {order && order.shippingInfo &&
                                                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                                </span>
                                            </div>
                                        </div>
                                        <Typography>Payment</Typography>
                                        <div className="orderDetailsContainerBox">
                                            <div>
                                                <p
                                                    className={
                                                        order.paymentInfo &&
                                                            order.paymentInfo.status === "succeeded"
                                                            ? "greenColor"
                                                            : "redColor"
                                                    }
                                                >
                                                    {order.paymentInfo &&
                                                        order.paymentInfo.status === "succeeded"
                                                        ? "PAID"
                                                        : "NOT PAID"}
                                                </p>
                                            </div>

                                            <div>
                                                <p>Amount:</p>
                                                <span>{order.totalPrice && order.totalPrice}</span>
                                            </div>
                                        </div>
                                        <Typography>Order Status</Typography>
                                        <div className="orderDetailsContainerBox">
                                            <div>
                                                <p className={order.orderStatus && order.orderStatus === "Delivered" ? "text-green-500" : "text-red-600"} >
                                                    {order.orderStatus && order.orderStatus}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="confirmCartItems">
                                        <Typography>Your Cart Items:</Typography>
                                        <div className="confirmCartItemsContainer">
                                            {order.orderItems &&
                                                order.orderItems.map((item) => (
                                                    <div key={item.product} className='cartItemProduct'>
                                                        <img src={item.image} alt="Product" />
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>{" "}
                                                        <span>
                                                            {item.quantity} X ₹{item.price} ={" "}
                                                            <b>₹{item.price * item.quantity}</b>
                                                        </span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <div style={{display: order.orderStatus === "Delivered" ? "none" : "block"}}>
                                    <form onSubmit={updateOrderSubmitHandler} className='w-11/12 m-auto border-2 border-slate-200 rounded-md p-4' >
                                        <h1 className='mb-2'>Process Order</h1>
                                        <div className='col-span-2 flex items-center'>
                                            <select onChange={(e) => setStatus(e.target.value)} style={{ width: '100%', height: '100%', minWidth: '200px' }}>
                                                <option value="">Choose Category</option>
                                                {order.orderStatus === 'Processing' && <option value="Shipped">Shipped</option>}
                                                {order.orderStatus === 'Shipped' && <option value="Delivered">Delivered</option>}
                                            </select>
                                        </div>
                                        <button className='w-1/2 mx-auto h-10 mt-4 rounded-md width-full height-full bg-main-red text-slate-50 font-medium hover:bg-slate-800' type="submit" disabled={loading ? true : false || status === "" ? true : false}>Change</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Fragment>

    )
}

export default ProcessOrder
