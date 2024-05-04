import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component'
import Reviewcard from './Reviewcard.js'
import Footer from '../layout/Footer/Footer.js';
import Loader from '../layout/Loader/loader.js';
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData.js'
import { addItemsToCart } from '../../actions/cartAction.js'



const ProductDetails = () => {
    let { id } = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, product, error } = useSelector(
        (state) => state.productDetails
    )

    const [quantity, setQuantity] = useState(1);
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

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id, error, alert])

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title={`E-Commerce - ${product.name}`}/>
                <div className="ProductDetails">
                    <div className='ImageDisplay'>
                        <Carousel className='Carousel'>
                            {product.images && product.images.map((item, i) => {
                                return <img
                                    src={item.url}
                                    key={item.url}
                                    alt={`$[i]Slide`}
                                    className='CarouselImage'
                                />
                            })}
                        </Carousel>
                    </div>
                    <div className='details-Block'>
                        <div className="details-Block1">
                            <h2>{product.name}</h2>
                            <p>Product Id: #{product._id}</p>
                        </div>
                        <div className="details-Block3">
                            <div className="details-Block3-2">
                                <span>{`₹${product.price}`}</span>
                            </div>
                            <div className="details-Block3-1">
                                <div className="details-Block3-1-1">
                                    <button className="btnsign" onClick={decreaseQuantity}>-</button>
                                    <input type="number" value={quantity} readOnly />
                                    <button className="btnsign" onClick={increaseQuantity}>+</button>
                                    <button className="btn btn-primary" onClick={addToCartHandler}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                        <div className="details-Block4">
                            <p>{product.description}</p>
                        </div>  
                        <div className="details-Block2">
                            <ReactStars edit={false} color={'aliceblue'} activeColor={"#ff5e14"} isHalf={true} value={parseInt(product.ratings, 10)} size={window.innerWidth < 600 ? 20 : 25} />
                            <span>({product.numOfReviews} reviews)</span>
                            <p className={product.stock < 1 ? `text-danger` : `text-success`} id='stockStatus'>
                                {product.stock < 1 ? "Out of Stock" : "In Stock"}
                            </p>
                        </div>
                        <div className="details-Block5">
                            <button id="submitReview">Submit Review</button>
                        </div>
                    </div>
                </div>
                <h3 className="reviewheading">Reviews</h3>
                <div className="Reviews">
                    {product.reviews && product.reviews[0] ?
                        <div className="reviewBox">
                            {
                                product.reviews.map((review) => {
                                    return <Reviewcard review={review} key={review._id} />
                                })
                            }
                        </div> : <p className='NoReviews'>No reviews yet..!</p>}
                </div>
                <Footer />
            </Fragment>
            }
        </Fragment>
    )
}

export default ProductDetails