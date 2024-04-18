import React, { Fragment } from 'react'
import { FaMouse } from "react-icons/fa";
import  './Home.css'
import Product from './Product.js'

const product = {
    name: "Blue Tshirt",
    price: "Rs 300",
    _id: "asdfghjk",
    images: [{url: 'https://www.jiomart.com/images/product/original/rvowvf0akl/eyebogler-teal-tshirts-men-tshirt-tshirt-for-men-tshirt-mens-tshirt-men-s-polo-neck-regular-fit-half-sleeves-colorblocked-t-shirt-product-images-rvowvf0akl-0-202402121853.jpg?im=Resize=(500,630)'}]
}

const Home = () => {
    return (
        <Fragment>
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>Find Amazing Products Below.</h1>
                <a href="#featuredProducts">
                    <button>Scroll <FaMouse/></button>
                </a>
            </div>
            <div className='featuredProducts' id='featuredProducts'>
                <Product product={product}/>    
            </div>
        </Fragment>
    )
}

export default Home
