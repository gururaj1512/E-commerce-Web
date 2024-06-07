import React from 'react'
import Sidebar from './Sidebar'

const Dashboard = () => {
    return (
        <div className='h-screen w-screen pt-20 flex'>
            <Sidebar />
            <div className="w-4/5 bg-slate-400">ABC</div>
        </div>
    )
}

export default Dashboard
