import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute2 = (props) => {
    const { children, ...rest } = props
    return (
        <Route
            {...rest}
            render={() => {
                if(localStorage.getItem("token")) {
                    return children
                } else {
                    <Navigate to="/" />
                }
            }}
        />
    )
}

export default ProtectedRoute2