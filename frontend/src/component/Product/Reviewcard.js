import React from 'react'
import profileImg from '../../images/Profile.webp'
import { Rating } from '@mui/material'

const Reviewcard = ({ review }) => {

    return (
        <div className="reviewCard mx-2 sm:mt-3">
            <article className="max-w-sm bg-white md:p-4 lg:p-4 xl:p-4 sm:p-2 text-sm leading-6 text-slate-700 shadow-xl dark:bg-slate-800 dark:text-slate-400 sm:text-base sm:leading-7 hover:scale-101">
                <Rating precision={0.5} value={review.rating} size={"small"} readOnly={true} />
                <p className="line-clamp-4 sm:line-clamp-5 mt-2 text-sm leading-5 sm:leading-3  text-slate-500 hover:text-slate-900 dark:text-slate-400 h-16 overflow-y-scroll">{review.comment}</p>
                <div className="mt-3 flex gap-x-2.5 text-sm font-semibold leading-6 text-slate-900 dark:text-slate-200">
                    <img className="h-6 w-6 flex-none rounded-full bg-slate-50 dark:bg-slate-900" src={profileImg} alt="" />
                    {review.name}
                </div>
            </article>
        </div>
    )
}

export default Reviewcard
