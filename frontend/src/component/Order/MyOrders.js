import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../../actions/orderAction';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
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
            minWidth: 150,
            flex: 1
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 100,
            flex: 0.5,
            cellClassName: (params) => {
                return params.api.getCellValue(params.id, 'status') === "Processing" ? "redColor" : "greenColor"
            }
        },
        {
            field: 'itemsQty',
            headerName: 'Items Qty',
            type: 'number',
            minWidth: 60,
            flex: 0.3
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            width: 100,
            flex: 0.5
        },
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'number',
            minWidth: 100,
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
                        <div className="w-screen max-w-screen overflow-x-hidden xl:pt-16 lg:pt-16 md:pt-16 sm:pt-12">
                            <div className='w-11/12 mx-auto'>
                                <div className='flex flex-row items-center h-10 my-5'>
                                    <div className='h-10 mr-2 w-3 bg-red-500 rounded-md'></div>
                                    <h2 className='h-5 text-red-500 text-md font-semibold'>{user.name}'s Order</h2>
                                </div>
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
                                        },
                                        fontSize: '14px',
                                    }}
                                />
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default MyOrders
