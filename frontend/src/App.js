import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import WebFont from 'webfontloader'
import React from 'react'
import Header from './component/layout/Header/Header.js'
import Home from './component/Home/Home.js'
import ProductDetails from './component/Product/ProductDetails.js'
import Products from './component/Product/Products.js'
import Search from './component/Product/Search.js'
import LoginSignup from './component/User/LoginSignup.js'


function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', "Droid Sans"]
      }
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />
          <Route exact path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />

          <Route exact path='/search' element={<Search />} />

          <Route exact path='/login' element={<LoginSignup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
