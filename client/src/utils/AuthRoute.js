import React,{useContext} from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import {AuthContext} from '../context/auth'
const PrivateRoute = () => {
    const {user}=useContext(AuthContext)
    return user ? <Navigate to="/"/> : <Outlet/>
};

export default PrivateRoute;