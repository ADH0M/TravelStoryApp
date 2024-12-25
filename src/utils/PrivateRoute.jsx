/* eslint-disable react/prop-types */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({role} ) => {
    const {auth} = useAuth();
    const location = useLocation();
    
    
    return auth?.roles?.some((item)=>role.includes(item))
    ? <Outlet/>
    : auth?.user 
    ? <Navigate to={'/'} state={{from:location}} replace/>
    : <Navigate to={'/unauthorized'} state={{from:location}} replace/>
  
  
}

export default PrivateRoute