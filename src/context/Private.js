import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loading } from "../shared/components/Loading";
import { AuthContext } from "./Auth";

const Private = ({ children }) => {
  let { user, setRedirect, loading } = useContext(AuthContext);
  let location = useLocation();
  
  // checking if user is true 
  if (user) {
    setRedirect(null)
    return children;
  }
  
  // checking if the loading state true 
  else if (loading)
  return (
    <div className="flex items-center justify-center mt-10 ">
      <Loading size={50}/>
    </div>
  ) 
  
  // redirecting to log in page 
  else {    
    setRedirect(location.pathname);
    return <Navigate to="/login"  replace></Navigate>;
  }
};

export default Private;
