import { useEffect, useState } from 'react'
import { getAllBooks, signIn } from '../api'
import { Book } from './types/book';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './Home';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import TopNavbar from './Navbar';
import { useIsLoggedIn } from './useIsLoggedIn';
import './App.css'
import Footer from './Footer';

function App() {
  let [isLoggedIn, setIsLoggedIn] = useIsLoggedIn();

  // console.log(`isLoggedIn:${isLoggedIn}`);
  if(isLoggedIn === null){
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <TopNavbar  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route index element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="home"
          element={<Home isLoggedIn={isLoggedIn}  />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
