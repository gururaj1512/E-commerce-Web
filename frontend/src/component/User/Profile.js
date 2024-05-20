import React, { Fragment, useEffect } from 'react'
import './Profile.css'
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
                loading ? <Loader /> : <Fragment>
                    <div className='mainProfileDiv'>
                        <h1>My Profile</h1>
                        <div className="secProfileDiv">
                            <MetaData title={`${user.name}'s Profile`} />
                            <div className="profileContainer">
                                <img src={user.avatar.url} alt={user.name} />
                            </div>
                            <div className='profileDetails'>
                                <div className='userName'>
                                    <p>{user.name}</p>
                                </div>
                                <div className='userCreatedAt'>
                                    <p>Joined on: {String(user.createdAt).substr(0, 10)}</p>
                                </div>
                                <div className='userEmail'>
                                    <p>Email : {user.email}</p>
                                </div>
                                <div className='userPersonalDetails'>
                                    <a href="/orders">My Orders</a>
                                    <a href="/password/update">Change Password</a>
                                    <a href="me/update">Edit Profile</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default Profile
