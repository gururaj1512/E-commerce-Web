import React, { Fragment, useEffect } from 'react'
import { FaMouse } from "react-icons/fa";
import './Home.css'
import ProductCard from './ProductCard.js'
import MetaData from '../layout/MetaData.js';
import { clearErrors, getProduct } from '../../actions/productAction.js'
import { useDispatch, useSelector } from "react-redux";
import Footer from '../layout/Footer/Footer.js'
import Loader from '../layout/Loader/Loader.js'
import { useAlert } from 'react-alert'



const Home = () => {
    const alert = useAlert()

    const dispatch = useDispatch()
    const { loading, products, error } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct())
    }, [dispatch, error, alert])

    return (
        <Fragment>
            {loading ? <Loader/> : 
                <Fragment>
                    <MetaData title={"E-Commerce"} />
                    <div className="banner">
                        <p>Welcome to E-Commerce</p>
                        <h1>Find Amazing Products Below.</h1>
                        <a href="#featuredProducts">
                            <button className='btn bg-light my-3'>Scroll<FaMouse /></button>
                        </a>
                    </div>
                    <h4 id='headingForProducts'>Featured Products</h4>
                    <div className='featuredProducts' id='featuredProducts'>
                        {products && products.map((product) => {
                            return <ProductCard product={product} key={product._id} />
                        })}
                    </div>
                    <Footer/>
                </Fragment>
            }
        </Fragment>
    )
}

export default Home
