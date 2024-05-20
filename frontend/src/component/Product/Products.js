import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from '../layout/Loader/Loader'
import ProductCard from '../Home/ProductCard'
import { useAlert } from 'react-alert'
import { useNavigate, useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from "@mui/material/Slider"
import Typography from "@mui/material/Typography"
import MetaData from '../layout/MetaData'


const categories = [
    "Laptop",
    "Footwear",
    "Mobile",
    "Sample",
    "Camera",
    "Vehicles",
    "Tops",
    "Bottoms"
]


const Products = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    let [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)

    const { loading, products, error, productsCount, resultPerPage, filteredProductCount } = useSelector(
        (state) => state.products
    )
    let { keyword } = useParams()

    let setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, navigate, error, alert, keyword, currentPage, price, category, ratings])

    let count = filteredProductCount;

    return (
        <Fragment>
            {loading ? <Loader /> : <Fragment>
                <MetaData title={"E-Commerce - Products"}/>
                <div className="allProducts">
                    <h2 className="productsHeading">Products</h2>
                    <div className="productPage">
                        <div className="filterBox">
                            <Typography className='Typography'>Price</Typography>
                            <Slider className='priceSlider' value={price} onChange={priceHandler} valueLabelDisplay='auto' aria-labelledby='range-slider' min={0} max={25000} />
                            <Typography className='Categoories'>Categoories</Typography>
                            <ul className='categoryBox'>
                                {categories.map((category) => {
                                    return <li className='category-link' key={category} onClick={(e)=> {
                                            e.preventDefault();
                                            setCategory(category);
                                        }}>
                                        {category}
                                    </li>
                                })}
                            </ul>
                            <fieldset>
                                <Typography component={"legend"} >Ratings Above</Typography>
                                <Slider value={ratings} 
                                    onChange={(e, newRating) => {
                                        e.preventDefault();
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby='continuos-slider'
                                    min={0}
                                    max={5}
                                />
                            </fieldset>
                        </div>
                        <div className="products">
                            {products && products.map((product) => {
                                return <ProductCard key={product._id} product={product} />
                            })}
                        </div>
                    </div>
                </div>

                {(resultPerPage < count) && <div className='pagination'>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText={"Next"}
                        prevPageText={"Prev"}
                        firstPageText={"1st"}
                        lastPageText={"Last"}
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='pageItemActive'
                        activeLinkClass='pageLinkActive'
                    />
                </div>}
            </Fragment>}
        </Fragment>
    )
}

export default Products
