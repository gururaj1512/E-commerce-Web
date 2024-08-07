import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import WebFont from 'webfontloader'

import Header from './component/layout/Header/Header.js'
import LoginRoute from './component/Route/LoginRoute.js'
import Home from './component/Home/Home.js'
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'
import Search from './component/Product/Search.js'
import LoginSignup from './component/User/LoginSignup.js'
import Profile from './component/User/Profile.js'
import UpdateProfile from './component/User/UpdateProfile.js'
import UpdatePassword from './component/User/UpdatePassword.js'
import ForgotPassword from './component/User/ForgotPassword.js'
import ResetPassword from './component/User/ResetPassword.js'
import Cart from './component/Cart/Cart.js'
import Shipping from './component/Cart/Shipping.js'
import ConfirmOrder from './component/Cart/ConfirmOrder.js'
import Payment from './component/Cart/Payment.js'
import OrderSuccess from './component/Cart/OrderSuccess.js'
import MyOrders from './component/Order/MyOrders.js'
import OrderDetails from './component/Order/OrderDetails.js'

import Dashboard from './component/Admin/Dashboard.js'
import Productlist from './component/Admin/Productlist.js'
import NewProduct from './component/Admin/NewProduct.js'
import UpdateProduct from './component/Admin/UpdateProduct.js'
import Userlist from './component/Admin/Userlist.js'
import UpdateUser from './component/Admin/UpdateUser.js'
import ProductReviews from './component/Admin/ProductReviews.js'
import Orderlist from './component/Admin/Orderlist.js';
import ProcessOrder from './component/Admin/ProcessOrder.js';

import axios from 'axios'
import { loadUser } from './actions/userActions.js';
import { useSelector } from 'react-redux';
import { persistReduxStore } from './store.js'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


function App() {

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey')
    setStripeApiKey(data.stripeApiKey)
  }

  const { user, isAuthenticated, isAdmin } = useSelector((state) => state.user)

  useEffect(() => {
    persistReduxStore.dispatch(loadUser());
    getStripeApiKey();
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    });
  }, []);


  return (
    <div className="App relative">
      <Router>
        <Header user={user} />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />
          <Route exact path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />

          <Route exact path='/search' element={<Search />} />

          <Route exact path='/login' element={<LoginSignup />} />
          {isAuthenticated && <Route exact path='/account' element={<Profile user={user} />} />}
          {isAuthenticated && <Route exact path='/me/update' element={<UpdateProfile />} />}
          {isAuthenticated && <Route exact path='/password/update' element={<UpdatePassword />} />}
          <Route exact path='/password/forgot' element={<ForgotPassword />} />
          <Route exact path='/password/reset/:token' element={<ResetPassword />} />

          <Route exact path='/cart' element={<Cart />} />
          {<Route exact path='/shipping' element={isAuthenticated === true ? <Shipping/> : <LoginRoute />} />}
          {<Route exact path='/order/confirm' element={isAuthenticated === true ? <ConfirmOrder/> : <LoginRoute />} />}
          
          {(isAuthenticated && stripeApiKey) && <Route exact path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />}
          
          {<Route exact path='/success' element={isAuthenticated === true ? <OrderSuccess/> : <LoginRoute />} />}
          {<Route exact path='/orders' element={isAuthenticated === true ? <MyOrders/> : <LoginRoute />} />}
          {<Route exact path='/order/:id' element={isAuthenticated === true ? <OrderDetails/> : <LoginRoute />} />}

          {isAuthenticated && isAdmin && <Route exact path='/admin/dashboard' element={<Dashboard />} />}
          {isAuthenticated && isAdmin && <Route exact path='/admin/products' element={<Productlist />} />}
          {isAuthenticated && isAdmin && <Route exact path='/admin/product' element={<NewProduct />} />}
          {isAuthenticated && isAdmin && <Route exact path='/admin/product/:id' element={<UpdateProduct />} />}
          {isAuthenticated && isAdmin && <Route exact path='/admin/orders' element={<Orderlist />} />}
          {isAuthenticated && isAdmin && <Route exact path='/admin/order/:id' element={<ProcessOrder />} />}
          {isAuthenticated && isAdmin && <Route exact path='/admin/users' element={<Userlist />} />}
          {isAuthenticated && isAdmin && <Route exact path='/admin/user/:id' element={<UpdateUser />} />}
          {isAuthenticated && isAdmin && <Route exact path='/admin/reviews' element={<ProductReviews />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
