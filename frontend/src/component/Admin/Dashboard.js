import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MetaData from '../layout/MetaData'
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from '../../actions/productAction';
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userActions.js';
import { Link } from 'react-router-dom';
import './Dashboard.css'

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);

    let outOfStock = 0;

    products && products.forEach((item) => {
        if (item.Stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    let totalAmount = 0;
    orders && orders.forEach((item) => {
        totalAmount += item.totalPrice;
    });

    return (
        <div className='h-screen w-screen pt-20 flex'>
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />
            <div className="w-4/5 bg-white">
                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ₹{totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
