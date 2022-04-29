import React from 'react'
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
    return <Route 
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