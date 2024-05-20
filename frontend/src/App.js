import './App.css';
import { Route, Routes, BrowserRouter as Router, Switch } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import WebFont from 'webfontloader'

import Header from './component/layout/Header/Header.js'
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

  const { user, isAuthenticated } = useSelector((state) => state.user)
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
    <div className="App">
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
          {isAuthenticated && <Route exact path='/shipping' element={<Shipping />} />}
          {isAuthenticated && <Route exact path='/order/confirm' element={<ConfirmOrder />} />}
          
          {(isAuthenticated && stripeApiKey) && <Route exact path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />}
          
          {isAuthenticated && <Route exact path='/success' element={<OrderSuccess />} />}
          {isAuthenticated && <Route exact path='/orders' element={<MyOrders />} />}
          {isAuthenticated && <Route exact path='/order/:id' element={<OrderDetails />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
