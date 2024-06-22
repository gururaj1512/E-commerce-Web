import { CheckCircle } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'


const OrderSuccess = () => {
    return (
        <Fragment>
            <div className="h-screen flex flex-col items-center justify-center">
                <div className='mb-10 flex flex-col items-center text-center'>
                    <CheckCircle sx={{ fontSize: '100px', color: '#DB4444' }} />
                    <Typography sx={{marginTop: '10px'}}>Your order has been placed successfully...!</Typography>
                </div>
                <Link to="/orders" className='text-slate-800 bg-slate-100 hover:text-slate-100 hover:bg-slate-800 py-2 px-5 rounded-md transition-all duration-300'>View Orders</Link>
            </div>
        </Fragment>
    )
}

export default OrderSuccess
