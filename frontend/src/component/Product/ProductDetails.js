import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../actions/productAction'
import { useNavigate, useParams } from 'react-router-dom';

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

    return (
        <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousel>
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
            </div>
        </Fragment>
    )
}

export default ProductDetails