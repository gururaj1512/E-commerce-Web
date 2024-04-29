import React from 'react'
import './Header.css'
import logo from '../../../images/logo.png'
import Login from '../../../images/login.png'
import Logout from '../../../images/logout.png'
import Orders from '../../../images/orders.png'
import { useAlert } from 'react-alert'
import { logout } from '../../../actions/userActions'
import { useDispatch } from 'react-redux'

const Header = ({ user }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    function logoutUser() {
        dispatch(logout())
        alert.success("User Logout Successfully..!")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ padding: 0 }}>
                <div className="container-fluid" style={{ backgroundColor: "#ffffff" }}>
                    <a className="navbar-brand" href="/"><img src={logo} className='logo' alt="" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/products">Products</a>
                            </li>
                            {/*<li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/">Action</a></li>
                                        <li><a className="dropdown-item" href="/">Another action</a></li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li><a className="dropdown-item" href="/">Something else here</a></li>
                                    </ul>
                                </li>*/}
                        </ul>
                        <form className="d-flex" role="search">
                            {/*<input className="search-input form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn search-button" type="submit"><FaSearch/></button>*/}
                            <a href="/orders">
                                <img className='login' src={Orders} alt="" />
                            </a>
                            <a href="/login">
                                <img className='login' src={Login} alt="" />
                            </a>
                            <img className='login' src={Logout} alt="" onClick={logoutUser}/>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
