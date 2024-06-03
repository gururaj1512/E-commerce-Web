import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import MainDisplay from "../../images/main-display.jpg";


const Search = () => {
    const navigate = useNavigate()

    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
        } else {
            navigate(`/products`)
        }
    }
    return (
        <Fragment>
            <div className='display h-screen w-auto overflow-hidden relative flex flex-row items-center justify-center'>
                <div className='flex items-center justify-center flex-col bg-gradient-to-b from-slate-950 to-slate-800 h-screen w-screen absolute top-0 left-0 opacity-80'>
                    <MetaData title={"E-Commerce - Search"} />
                    <form onSubmit={searchSubmitHandler} className='flex flex-row drop-shadow-2xl'>
                        <input type="text" placeholder='Search a product ...' onChange={e => setKeyword(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 font-medium w-96 md:w-80 sm:w-60 p-2.5 focus:ring-blue-500 focus:border-blue-500 active:border-blue-500' />
                        <input type="submit" value="Search" className='bg-main-red px-4 text-slate-50 hover:bg-slate-800 transition hover:scale-105' />
                    </form>
                </div>
                <img src={MainDisplay} alt="" className='h-screen w-screen object-cover' />
            </div>
        </Fragment>
    )
}

export default Search
