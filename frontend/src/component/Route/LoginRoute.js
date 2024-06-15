import { Person } from '@mui/icons-material'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import React from 'react'

const LoginRoute = () => {
    return (
        <div className='flex flex-col items-center justify-center w-screen h-screen bg-white'>
            <div><Person className='text-4xl fill-red-600' sx={{ fontSize: 100, color: '#DB4444' }} /></div>
            <a href='/login' className='hover:text-blue-900 text-blue-700 transition-all duration-300 text-wrap'>
                <div className='flex items-center'>Login to access this feature<KeyboardDoubleArrowRightIcon/></div>
            </a>
        </div>
    )
}

export default LoginRoute
