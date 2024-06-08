import React, { Fragment, useEffect, useState } from 'react'
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const categories = [
    "Electronics",
    "Tops",
    "Footwear",
    "Bottom",
    "Vehicles",
    "Books",
    "Food",
    "Other"
];

const Products = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    let [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 25000])
    const [category, setCategory] = useState("")
    const [ratings, setRatings] = useState(0)

    const categoryHandler = (e) => {
        setCategory(e.target.value);
    }

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
                <MetaData title={"E-Commerce - Products"} />

                <div className="w-full pt-20">

                    <div className="w-11/12 mx-auto flex items-center justify-evenly bg-slate-100 rounded-md sm:flex-col">

                        <div className='w-1/3 sm:w-1/2 md:w-1/2 sm:m-2'>
                            <FormControl sx={{ m: 1, width: '100%' }} size='small'>
                                <InputLabel id="demo-select-small-label">Category</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={category}
                                    onChange={categoryHandler}
                                    autoWidth
                                    label="Category"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {categories.map((category) => {
                                        return <MenuItem value={category} key={category}>{category}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                        <div className='flex flex-row w-full justify-around'>
                            <div className='w-1/3 sm:w-20'>
                                <Typography className='Typography'>Price</Typography>
                                <Slider sx={{ margin: 0 }} className='priceSlider' value={price} onChange={priceHandler} valueLabelDisplay='auto' aria-labelledby='range-slider' min={0} max={25000} size='small' />
                            </div>
                            <div className='w-1/3 sm:w-20'>
                                <Typography component={"legend"} >Ratings</Typography>
                                <Slider value={ratings}
                                    onChange={(e, newRating) => {
                                        e.preventDefault();
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby='continuos-slider'
                                    min={0}
                                    max={5}
                                    size='small'
                                />
                            </div>
                        </div>
                    </div>

                    <div className="products w-11/12 mx-auto">
                        <div className='grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center'>
                            {products && products.map((product) => {
                                return <ProductCard key={product._id} product={product} />
                            })}
                        </div>
                    </div>

                </div>

                {(resultPerPage < count) && <div className='pagination mt-5 mb-10'>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                    />
                </div>}
            </Fragment>}
        </Fragment>
    )
}

export default Products
