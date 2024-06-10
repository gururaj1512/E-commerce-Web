import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import { deleteOrder, getAllOrders, clearErrors } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';


const Orderlist = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    let columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.6 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.6,
            cellClassName: (params) => {
                return params.api.getCellValue(params.id, 'status') === "Processing" ? "redColor" : "greenColor"
            }
        },
        {
            field: 'itemsQty',
            headerName: 'Items Qty',
            type: 'number',
            minWidth: 50,
            flex: 0.2,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            minWidth: 60,
            flex: 0.3,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 80,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/order/${params.id}`}>
                            <Edit sx={{ color: '#1e293b' }} />
                        </Link>
                        <Button sx={{ padding: 0, minWidth: '24px' }} onClick={() => deleteOrderHandler(params.id)}>
                            <Delete sx={{ color: '#dc2626' }} />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    let rows = [];

    orders && orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus,
        });
    });

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors)
        }
        if (isDeleted) {
            alert.success('Order deleted successfully')
            navigate('/admin/dashboard')
            dispatch({type : DELETE_ORDER_RESET})
        }
        dispatch(getAllOrders())
    }, [dispatch, alert, error, deleteError, navigate, isDeleted])

    return (
        <Fragment>
            <MetaData title={`All Orders --> Admin`}></MetaData>
            <div className='max-w-100 h-auto pt-20 sm:pt-16'>
                <div className='w-11/12 mx-auto'>
                    <h1 className='text-center text-2xl mb-2'>All Orders</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[10, 20, 50, 100]}
                        disableRowSelectionOnClick
                        className="productListTable"
                        autoHeight
                        sx={{
                            fontSize: '14px',
                            '@media (max-width: 780px)': {
                                fontSize: '12px'
                            },
                            '& .css-yrdy0g-MuiDataGrid-columnHeaderRow': {
                                backgroundColor: 'red',
                                background: 'red'
                            },
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
                </div>
            </div>
        </Fragment>
    )
}

export default Orderlist
