import React from 'react'
import logo from '../../../images/logo.png'
import small_logo from '../../../images/small_logo.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAlert } from 'react-alert'
import { logout } from '../../../actions/userActions'
import { useDispatch } from 'react-redux'
import StoreIcon from '@mui/icons-material/Store';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom'


const Header = ({ user }) => {
    const location = useLocation()
    function current_loc() {
        if (location.pathname === '/login' ) {
            return 'hidden'
        }
    }

    const alert = useAlert()
    const dispatch = useDispatch()

    function logoutUser() {
        dispatch(logout())
        alert.success("User Logout Successfully..!")
    }

    return (
        <div className={`fixed top-4 z-10 w-full ${current_loc()}`}>
            <div className='w-11/12 h-12 sm:h-9 bg-slate-100 border-l-4 border-slate-100 mx-auto rounded-lg'>
                <div className='w-auto h-full flex flex-row justify-between relative'>
                    <a href="/"><img src={logo} alt="" className='h-12 sm:h-9 min-w-10 rounded-lg md:hidden sm:hidden' /></a>
                    <a href="/"><img src={small_logo} alt="" className='h-12 sm:h-9 min-w-10 rounded-lg lg:hidden xl:hidden absolute top-0 left-0' /></a>
                    <div className='w-1/2 md:w-1/3 sm:w-1/4 h-full flex items-center justify-evenly'>
                        <a href="/products" className='hover:text-red-500 hover:bg-slate-800 sm:px-1 px-1 py-1 rounded-md transition-all'>
                            <StoreIcon fontSize='small' sx={{color: '#DB4444'}}/>
                            <span className='ml-1 text-sm font-semibold hover:font-medium sm:hidden md:hidden'>PRODUCTS</span>
                        </a>
                        <a href="/cart" className='hover:text-red-500 hover:bg-slate-800 sm:px-1 px-1 py-1 rounded-md transition-all'>
                            <ShoppingCartIcon fontSize='small' sx={{color: '#DB4444'}}/>
                            <span className='ml-1 text-sm font-semibold hover:font-medium sm:hidden md:hidden'>CART</span>
                        </a>
                        <a href="/orders" className='hover:text-red-500 hover:bg-slate-800 sm:px-1 px-1 py-1 rounded-md transition-all'>
                            <LocalMallIcon fontSize='small' sx={{color: '#DB4444'}}/>
                            <span className='ml-1 text-sm font-semibold hover:font-medium sm:hidden md:hidden'>ORDERS</span>
                        </a>
                    </div>

                    <div className='h-full flex items-center justify-self-end mr-2 sm:mr-0'>
                        <a href="/login"><IconButton children={<ManageAccountsIcon/>} /></a>
                        <IconButton children={<ExitToAppIcon/>} onClick={logoutUser} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
