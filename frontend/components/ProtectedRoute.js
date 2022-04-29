import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({element: Component, ...rest}) => {
    return <Outlet 
        {...rest}
        render={(props) => {
            if(localStorage.getItem("token")) {
                return <Component {...props} />
            } else {
                return <Navigate to="/" />
            }
        }}
    />
}

export default ProtectedRoute