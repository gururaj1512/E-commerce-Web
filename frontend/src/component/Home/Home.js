import React, { Fragment, useEffect } from 'react'
import ProductCard from './ProductCard.js'
import MetaData from '../layout/MetaData.js';
import { clearErrors, getProduct } from '../../actions/productAction.js'
import { useDispatch, useSelector } from "react-redux";
import Footer from '../layout/Footer/Footer.js'
import Loader from '../layout/Loader/Loader.js'
import { useAlert } from 'react-alert'
import Iphone from "../../images/iphone_display.png";
import { ArrowRight } from '@mui/icons-material';
import MainDisplay from "../../images/main-display.jpg";
import SearchIcon from '@mui/icons-material/Search';


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
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={"E-Commerce"} />
                    <div className='w-auto h-auto bg-white'>

                        <div className="display h-screen w-auto overflow-hidden relative">
                            <div className='flex items-center justify-center flex-col bg-gradient-to-b from-slate-950 to-slate-800 h-screen w-screen absolute top-0 left-0 opacity-80'>
                                <h1 className='text-6xl sm:text-4xl text-bold text-slate-100 mb-8 mx-4 text-wrap text-center'>Welcome to Ecommerce!</h1>
                                <a href="#featuredProducts">
                                    <button className='main-button'>View Products</button>
                                </a>
                                <a href="/search">
                                    <div className='w-12 h-12 sm:w-8 sm:h-8 rounded-full bg-main-red absolute bottom-5 right-10 flex items-center justify-center hover:scale-105 hover:bg-slate-800 hover:border-2 hover:border-main-red'><SearchIcon sx={{color: '#ebebeb'}} /></div>
                                </a>
                            </div>
                            <img src={MainDisplay} alt="" className='h-screen w-screen object-cover' />
                        </div>

                        <div className='homepage-main-display py-6'>
                            <div className='flex w-11/12 sm:w-10/12 mx-auto bg-black sm:flex-col  md:flex-row'>
                                <div className='h-auto w-1/2 min-w-60 lg:pl-16 md:px-8 sm:px-4 m-auto'>
                                    <h1 className='text-xl sm:text-md text-cyan-50 leading-loose'>iPhone 14 Series</h1>
                                    <p className='text-6xl h-1/2 sm:text-3xl md:text-4xl lg:text-5xl text-cyan-50 mt-4 mb-2'>Up to 10% off Voucher</p>
                                    <a href="/products" className='text-md sm:text-sm text-cyan-50'><span className='text-purple-500'>SHOP NOW</span><ArrowRight /></a>
                                </div>
                                <div className='m-w-52 lg:w-1/2 my-auto'>
                                    <img src={Iphone} alt="" className='' />
                                </div>
                            </div>
                        </div>

                        <div className="top-product-display w-auto h-auto bg-slate-50 py-2">
                            <div className='w-11/12 mx-auto'>
                                <div className='flex flex-row items-center h-10 my-3'>
                                    <div className='h-10 mr-2 w-3 bg-red-500 rounded-md'></div>
                                    <h2 className='h-5 text-red-500 text-md font-semibold'>Top Products</h2>
                                </div>

                                <div className="top-products" id='featuredProducts'>
                                    <div className='grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                                        {products && products.map((product) => {
                                            return <ProductCard product={product} key={product._id} />
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </Fragment>
            }
        </Fragment>
    )
}

export default Home
