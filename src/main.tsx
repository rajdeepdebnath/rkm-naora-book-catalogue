import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './Home';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import TopNavbar from './Navbar';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TopNavbar />
    <App />
  </React.StrictMode>,
)
