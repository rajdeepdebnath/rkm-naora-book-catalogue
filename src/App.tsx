import { useEffect, useState } from 'react'
import { getAllBooks, signIn } from '../api'
import { Book } from './types/book';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './Home';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    console.log(localStorage.getItem('isLoggedIn'));
    
    setIsLoggedIn(Boolean(localStorage.getItem('isLoggedIn')))
  }, []);

  // console.log(`isLoggedIn:${isLoggedIn}`);
  if(isLoggedIn === null){
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ 
        <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home setIsLoggedIn={setIsLoggedIn} />
            </ProtectedRoute>} />
        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home setIsLoggedIn={setIsLoggedIn} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
