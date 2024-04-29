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
import { loadUser } from './actions/userActions.js';
// import store from './store.js'
import { useSelector } from 'react-redux';
import { store } from './store.js'


function App() {

  useEffect((e) => {
    store.dispatch(loadUser());
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    });
  }, []);

  const { user } = useSelector((state) => state.user)

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
          <Route exact path='/account' element={<Profile user={user} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
