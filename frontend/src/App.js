import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import WebFont from 'webfontloader'
import React, { useEffect } from 'react'
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
import { loadUser } from './actions/userActions.js';
import { useSelector } from 'react-redux';
import { persistReduxStore } from './store.js'


function App() {

  const { user, isAuthenticated } = useSelector((state) => state.user)
  useEffect(() => {
    persistReduxStore.dispatch(loadUser());
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
          { isAuthenticated && <Route exact path='/account' element={<Profile user={user} />} /> }
          { isAuthenticated && <Route exact path='/me/update' element={<UpdateProfile />} /> }
          { isAuthenticated && <Route exact path='/password/update' element={<UpdatePassword />} /> }
          <Route exact path='/password/forgot' element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
