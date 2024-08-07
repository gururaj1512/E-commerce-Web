import React, { Fragment, useEffect, useRef } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import axios from 'axios'
import './Payment.css'
import { CreditCard, Event, VpnKey } from '@mui/icons-material'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'
import { clearErrors, createOrder } from '../../actions/orderAction'


const Payment = () => {

    const payBtn = useRef(null);
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user)
    const { error } = useSelector((state) => state.newOrder)
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post("/api/v1/payment/process", paymentData, config)

            const client_secret = data.client_secret;
            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message)
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    dispatch(createOrder(order));
                    navigate('/success');
                } else {
                    alert.error("There is a issue while processing payment")
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            alert.error("error.response.data.message");
        }
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, error, alert])

    return (
        <Fragment>
            <MetaData title={"Payment"} />
            <div className='w-screen pt-16 sm:pt-16'>
                <CheckoutSteps activeStep={2} />
                <div className="paymentContainer">
                    <form className='paymentForm' onSubmit={(e) => submitHandler(e)} >
                        <div>
                            <CreditCard />
                            <CardNumberElement className='paymentInput'/>
                        </div>
                        <div>
                            <Event />
                            <CardExpiryElement className='paymentInput' />
                        </div>
                        <div>
                            <VpnKey />
                            <CardCvcElement className='paymentInput' />
                        </div>
                        <input type="submit" value={`Pay - ${orderInfo && orderInfo.totalPrice}`} ref={payBtn} className='paymentFormBtn' />
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Payment
