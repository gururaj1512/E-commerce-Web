import { CheckCircle } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './OrderSuccess.css'


const OrderSuccess = () => {
    return (
        <Fragment>
            <div className="order-success">
                <CheckCircle />
                <Typography>Your order has been placed successfully...!</Typography>
                <Link to="/order/me">View Orders</Link>
            </div>
        </Fragment>
    )
}

export default OrderSuccess
