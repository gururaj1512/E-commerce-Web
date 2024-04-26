import React from 'react'
import './ProductDetails.css'
import ReactStars from 'react-rating-stars-component'
import profileImg from '../../images/Profile.webp'

const Reviewcard = ({ review }) => {

    return (
        <div className="reviewCard">
            <div className="userReviewDetails">
                <img src={profileImg} alt="User" />
                <div className="userReviewDetails1">
                    <p>{review.name}</p>
                    <ReactStars edit={false} color={'#ff5e1430'} activeColor={"#ff5e14"} isHalf={true} value={review.rating} size={window.innerWidth < 600 ? 20 : 25} />
                </div>
            </div>
            <span className='reviewComment'>{review.comment}</span>
        </div>
    )
}

export default Reviewcard
