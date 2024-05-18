import React, { Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './MyOrders.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
import loader from '../layout/Loader/loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@mui/material';
import MetaData from '../layout/MetaData';
import { Launch } from '@mui/icons-material';


const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {user} = useSelector((state) => state.user);
    const {loading, error, orders} = useSelector((state) => state.myOrders);

    return (
        <Fragment>
            <MetaData title={`${user.name}'s Order`}></MetaData>
            {
                loading ? <loader/> : (
                    <Fragment>
                        <div className="myOrdersPage">
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSizeOptions={10}
                                disableRowSelectionOnClick
                                className='myOrderTable'
                                autoHeight
                            />
                            <Typography>{user.name}'s Order</Typography>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default MyOrders
