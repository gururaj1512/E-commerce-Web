import './App.css';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import WebFont from 'webfontloader'
import React from 'react'
import Header from './component/layout/Header/Header.js'
import Footer from './component/layout/Footer/Footer.js'
import Home from './component/Home/Home.js'


function App() {
  React.useEffect(() => {
    WebFont.load({
      google:{
        families:['Roboto', "Droid Sans"]
      }
    })
  }, [])
  
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
