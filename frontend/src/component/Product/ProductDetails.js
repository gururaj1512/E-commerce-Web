import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../actions/productAction'
import { useNavigate, useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component'
import Reviewcard from './Reviewcard.js'



const ProductDetails = ({ match }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { loading, product, error } = useSelector(
        (state) => state.productDetails
    )

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [dispatch, id, navigate])

    // const options = {
    //     edit: false,
    //     color: "aliceblue",
    //     acticeColor: "#ff5e14",
    //     size: window.innerWidth < 600 ? 20 : 25,
    //     isHalf: true
    // }

    return (
        <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousel className='Carousel'>
                        {product.images &&
                            product.images.map((item, i) => {
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
                        <p>{product._id}</p>
                    </div>
                    <div className="details-Block4">
                        <p>{product.description}</p>
                    </div>
                    <div className="details-Block2">
                        <ReactStars edit={false} color={'aliceblue'} activeColor={"#ff5e14"} isHalf={true} value={parseInt(product.ratings, 10)} size={window.innerWidth < 600 ? 20 : 25}/>
                        <span>({product.numOfReviews} reviews)</span>
                        <p className={product.Stock < 1 ? `text-danger` : `text-success`} id='stockStatus'>
                            {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                        </p>
                    </div>
                    <div className="details-Block3">
                        <div className="details-Block3-1">
                            <div className="details-Block3-1-1">
                                <button className="btnsign">-</button>
                                <input type="number" value={1} readOnly />
                                <button className="btnsign">+</button>
                                <div />
                                <button className="btn btn-primary">Add to cart</button>
                            </div>
                        </div>
                    </div>
                    <div className="details-Block5">
                        <button id="submitReview">Submit Review</button>
                    </div>
                </div>
            </div>
            <div className="Reviews">
                <h3 className="reviewheading">Reviews</h3>
                {product.reviews && product.reviews[0] ? 
                <div className="reviewBox">
                    {
                        product.reviews && product.reviews.map((review) => {
                            return <Reviewcard review={review} key={review._id}/>
                        })
                    }
                </div> : <p className='NoReviews'>No reviews yet..!</p>}
            </div>
        </Fragment>
    )
}

export default ProductDetails