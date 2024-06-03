import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import Reviewcard from './Reviewcard.js'
import Footer from '../layout/Footer/Footer.js';
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData.js'
import { addItemsToCart } from '../../actions/cartAction.js'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material'
import { NEW_REVIEW_RESET } from '../../constants/productConstants.js'

const ProductDetails = () => {
    let { id } = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, product, error } = useSelector(
        (state) => state.productDetails
    )

    const { success, error: reviewError } = useSelector((state) => state.newReview)

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        let qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        let qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item added to Cart");
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set('rating', rating);
        myForm.set('comment', comment);
        myForm.set('productId', id);

        dispatch(newReview(myForm));
        setOpen(false)
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (reviewError) {
            alert.error(reviewError)
            dispatch(clearErrors())
        }
        if (success) {
            alert.success("Review submitted successfully..!")
            dispatch({ type: NEW_REVIEW_RESET })
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert, success, reviewError])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <div className="w-full h-screen pt-16 text-slate-900">
                        <MetaData title={product.name}></MetaData>
                        <div className='w-11/12 mx-auto'>
                            <p className='text-xs font-medium my-4 sm:my-2 text-slate-500'>Products / <span className='font-medium text-slate-900'>{product.name}  (Id: {product._id})</span></p>

                            <div className='w-full h-76 flex lg:flex-row xl:flex-row md:flex-row sm:flex-col sm:justify-center'>
                                <div className='w-1/3 md:w-1/2 sm:w-full h-76'>
                                    <Carousel className='w-full bg-slate-100 rounded-md h-100 h-76'>
                                        {product.images && product.images.map((item, i) => {
                                            return <img src={item.url} key={item.url} alt={`$[i]Slide`} className='w-full h-76 h-72 object-cover' />
                                        })}
                                    </Carousel>
                                </div>
                                <div className='w-2/3 md:w-1/2 sm:w-full sm:px-4 sm:mt-2 px-12 md:px-4'>
                                    <div className='flex flex-col'>
                                        <h2 className='text-2xl md:text-xl font-medium tracking-1'>{product.name}</h2>
                                        <div className='flex items-center pt-2 flex-wrap'>
                                            <Rating
                                                readOnly={true}
                                                sx={{
                                                    '& .MuiRating-iconFilled': {
                                                        color: '#ef4444',
                                                    }
                                                }}
                                                precision={0.5}
                                                value={parseInt(product.ratings, 10)}
                                                size={"small"}
                                            />
                                            <span className='ml-2 md:ml-1 text-base md:text-sm text-slate-500'>({product.numOfReviews} reviews)</span>
                                            <span className={`md:m-0 text-base md:text-sm ${product.stock < 1 ? 'text-red-500' : 'text-green-500'}`} id='stockStatus'>
                                                {product.stock < 1 ? "Out of Stock" : "In Stock"}
                                            </span>
                                        </div>
                                        <p className='text-xl font-medium font-roboto py-2'>{`₹${product.price}`}</p>
                                        <p className='text-xs max-h-16 min-h-16 overflow-y-scroll'>{product.description}</p>
                                        <hr className='my-3' />
                                        <div className='flex'>
                                            <div className='flex items-center'>
                                                <button className="h-8 w-8 text-lg md:w-6 md:h-6 sm:w-6 sm:h-6 rounded-l-sm bg-main-red hover:border-2 hover:border-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all text-slate-50" onClick={decreaseQuantity}>-</button>
                                                <input type="number" value={quantity} className='bg-gray-50 text-gray-900 text-sm h-8 w-16 md:w-12 md:h-6 sm:w-12 sm:h-6 text-center' readOnly />
                                                <button className="h-8 w-8 text-lg md:w-6 md:h-6 sm:w-6 sm:h-6 rounded-r-sm bg-main-red hover:border-2 hover:border-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all text-slate-50" onClick={increaseQuantity}>+</button>
                                            </div>

                                            <button className="ml-10 md:ml-5 h-8 md:h-6 w-32 md:w-24  md:text-sm sm:ml-5 sm:h-6 sm:w-24  sm:text-sm rounded-sm bg-main-red hover:bg-slate-800 transition-all text-slate-50" onClick={addToCartHandler} disabled={product.stock < 1 ? true : false}>Add to cart</button>
                                        </div>
                                        <div className='mt-16 md:mt-8 sm:mt-4'>
                                            <button onClick={submitReviewToggle} className='ml-auto bg-white hover:bg-transparent hover:text-main-red text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow-sm md:text-sm sm:text-sm'>Submit Review</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
                            <DialogTitle>Submit Reviews</DialogTitle>
                            <DialogContent className='submitDialog'>
                                <Rating onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size={"large"}
                                />
                                <textarea className='submitDialogTextArea' cols={30} rows={5} value={comment} onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                                <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
                            </DialogActions>
                        </Dialog>

                        <div className="w-auto h-auto bg-slate-50 py-4 mt-4">
                            <div className='w-11/12 mx-auto'>
                                <div className='flex flex-row items-center h-10'>
                                    <div className='h-10 mr-2 w-3 bg-red-500 rounded-md'></div>
                                    <h2 className='h-5 text-red-500 text-md font-semibold'>Top Reviews</h2>
                                </div>

                                <div className="w-full md:mt-4 lg:mt-4 xl:mt-4 sm:mt-2">
                                    {product.reviews && product.reviews[0] ?
                                        <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                                            {
                                                product.reviews.map((review) => {
                                                    return <Reviewcard review={review} key={review._id} />
                                                })
                                            }
                                        </div> : <p className=''>No reviews yet..!</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default ProductDetails