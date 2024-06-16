import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader/Loader'

const Profile = () => {
    const navigate = useNavigate()

    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login')
        }
    }, [navigate, isAuthenticated])

    return (
        <Fragment>
            {
                loading ? <Loader /> : (
                    <Fragment>
                        <div className='flex items-center justify-center h-screen w-screen bg-white'>
                            <MetaData title={`${user.name}'s Profile`} />
                            <div className="w-1/2 md:w-4/5 sm:w-5/6 h-2/5 md:h-2/3 sm:h-2/3 bg-slate-50 border-l-4 border-main-red rounded-md">
                                <div className='flex md:flex-col sm:flex-col justify-evenly items-center xl:my-4 lg:my-4 md:my-3 sm:my-2'>
                                    <img src={user.avatar.url} alt={user.name} className='h-20 w-20 md:h-16 md:w-16 sm:h-16 sm:w-16 object-fill rounded-full border-2 p-1 md:my-2 sm:mb-3' />
                                    <div className=''>
                                        <p className='sm:text-center md:text-center sm:text-sm'>{user.name}</p>
                                        <p className='sm:text-center md:text-center sm:text-xs'>Email : {user.email}</p>
                                        <p className='sm:text-center md:text-center text-sm mt-3 sm:text-xs'>Joined on: {String(user.createdAt).substr(0, 10)}</p>
                                    </div>
                                </div>
                                <div className='flex sm:flex-col sm:items-center justify-evenly xl:mt-10 lg:mt-10 md:mt-12 sm:mt-6'>
                                    <a href="/orders" className='hover:text-slate-100 text-slate-800 hover:bg-slate-800 bg-white py-1 px-2 rounded-md md:text-sm sm:text-sm border-1'>My Orders</a>
                                    <a href="/password/update" className='hover:text-slate-100 text-slate-800 hover:bg-slate-800 bg-white py-1 px-2 rounded-md md:text-sm sm:text-sm border-1'>Change Password</a>
                                    <a href="me/update" className='hover:text-slate-100 text-slate-800 hover:bg-slate-800 bg-white py-1 px-2 rounded-md md:text-sm sm:text-sm border-1'>Edit Profile</a>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

export default Profile
