import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './MyOrders.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
import loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Typography } from '@mui/material';
import MetaData from '../layout/MetaData';
import { Launch } from '@mui/icons-material';


const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector((state) => state.user);
    const { loading, error, orders } = useSelector((state) => state.myOrders);

    const columns = [
        {
            field: 'id',
            headerName: 'Order Id',
            minWidth: 300,
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.api.getCellValue(params.id, 'status') === "Processing" ? "redColor" : "greenColor"
            }
        },
        {
            field: 'itemsQty',
            headerName: 'Items Qty',
            type: 'number',
            minWidth: 150,
            flex: 0.3
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            width: 300,
            flex: 0.5
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'number',
            minWidth: 150,
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.id}`}>
                        <Launch />
                    </Link>
                )
            },
        }
    ];
    let rows = [];
    orders && orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
            id: item._id
        })
    });

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(myOrders())
    }, [dispatch, alert, error])

    return (
        <Fragment>
            <MetaData title={`${user.name}'s Order`}></MetaData>
            {
                loading ? <loader /> : (
                    <Fragment>
                        <div className="myOrdersPage">
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSizeOptions={10}
                                disableRowSelectionOnClick
                                className='myOrderTable'
                                autoHeight
                                sx={{
                                    '& .redColor': {
                                        color: "red",
                                        fontWeight: 500,
                                    },
                                    '& .greenColor': {
                                        color: "green",
                                        fontWeight: 500,
                                    }
                                }}
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
