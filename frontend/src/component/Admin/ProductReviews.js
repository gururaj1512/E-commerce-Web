import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Delete, Star } from '@mui/icons-material';
import { Button } from '@mui/material';
import Input from '@mui/joy/Input';
import MetaData from '../layout/MetaData';
import { clearErrors, getAllReviews, deleteReview } from '../../actions/productAction';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';

const ProductReviews = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, reviews, loading } = useSelector((state) => state.productReviews);
    const { error: deleteError, isDeleted } = useSelector((state) => state.review);

    const [productId, setProductId] = useState("")

    const deleteProductHandler = (reviewId) => {
        dispatch(deleteReview(reviewId, productId))
    }
    const productReviewSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId))
    }

    let columns = [
        { field: "id", headerName: "Review ID", minWidth: 150, flex: 0.5 },
        {
            field: "user",
            headerName: "User",
            minWidth: 50,
            flex: 0.5,
        },
        {
            field: "comment",
            headerName: "Comment",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 60,
            flex: 0.2,
            cellClassName: (params) => {
                return params.api.getCellValue(params.id, 'rating') <= 3 ? "redColor" : "greenColor"
            }
        },
        {
            field: "actions",
            flex: 0.2,
            headerName: "Actions",
            minWidth: 80,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Button sx={{ padding: 0, minWidth: '24px' }} onClick={() => deleteProductHandler(params.id)}>
                            <Delete sx={{ color: '#dc2626' }} />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    let rows = [];

    reviews && reviews.forEach((item) => {
        rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.name,
        });
    });

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId))
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors)
        }
        if (isDeleted) {
            alert.success('Review deleted successfully')
            navigate('/admin/reviews')
            dispatch({ type: DELETE_REVIEW_RESET })
        }
    }, [dispatch, alert, error, deleteError, navigate, isDeleted, productId])

    return (
        <Fragment>
            <MetaData title={`All Reviews --> Admin`}></MetaData>
            <div className='max-w-100 h-auto pt-20 sm:pt-16'>
                <div className='w-11/12 mx-auto'>
                    <form onSubmit={productReviewSubmitHandler} className='w-full mb-4 border-2 border-slate-200 rounded-md py-4' >
                        <h1 className='text-center text-2xl mb-2'>All Reviews</h1>
                        <div className='flex items-center justify-center w-1/2 mx-auto'>
                            <Input startDecorator={<Star />} type="text" placeholder='Enter Product-Id' required value={productId} onChange={(e) => setProductId(e.target.value)} sx={{ width: '100%', height: '100%', minWidth: '200px' }} />
                            <button className='ml-4 h-9 rounded-md px-4 height-full bg-main-red text-slate-50 hover:bg-slate-800' type="submit" disabled={loading ? true : false || productId === "" ? true : false}>Search</button>
                        </div>
                    </form>
                    {
                        reviews && reviews.length > 0 ? <DataGrid
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
                        /> : <h1 className='text-center text-2xl mt-6'>No Reviews Found</h1>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default ProductReviews
