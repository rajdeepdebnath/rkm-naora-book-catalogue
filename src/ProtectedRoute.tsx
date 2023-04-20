import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  console.log(isLoggedIn);
  
    // if (!isLoggedIn && !Boolean(localStorage.getItem('isLoggedIn'))) {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

  export default ProtectedRoute;