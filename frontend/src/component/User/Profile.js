import React, { Fragment, useEffect } from 'react'
import './Profile.css'
import MetaData from '../layout/MetaData'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader/loader'

const Profile = () => {
    const navigate = useNavigate()

    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login')
        }
    })

    return (
        <Fragment>
            {
                loading ? <Loader /> : <Fragment>
                    <div className='mainProfileDiv'>
                        <MetaData title={`${user.name}'s Profile`} />
                        <div className="profileContainer">
                            <h1>My Profile</h1>
                            <img src={user.avatar.url} alt={user.name} />
                            <Link to="me/update">Edit Profile</Link>
                        </div>
                        <div>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined on</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>
                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

export default Profile
