import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import { clearErrors, getAdminProduct, deleteProduct } from '../../actions/productAction';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';


const Productlist = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    let columns = [
        { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 50,
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 60,
            flex: 0.5,
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
                        <Link to={`/admin/product/${params.id}`}>
                            <Edit sx={{ color: '#1e293b' }} />
                        </Link>
                        <Button sx={{ padding: 0, minWidth: '24px' }} onClick={() => deleteProductHandler(params.id)}>
                            <Delete sx={{ color: '#dc2626' }} />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    let rows = [];

    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name,
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
            alert.success('Prduct deleted successfully')
            navigate('/admin/dashboard')
            dispatch({type : DELETE_PRODUCT_RESET})
        }
        dispatch(getAdminProduct())
    }, [dispatch, alert, error, deleteError, navigate, ])

    return (
        <Fragment>
            <MetaData title={`All Products --> Admin`}></MetaData>
            <div className='max-w-100 h-auto pt-20 sm:pt-16'>
                <div className='w-11/12 mx-auto'>
                    <h1 className='text-center text-2xl'>All Products</h1>
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
                            }
                        }}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default Productlist
