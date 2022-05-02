import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute2 = (props) => {
    const { children, ...rest } = props
    return (
        <Route
            {...rest}
            render={() => {
                if(localStorage.getItem("token")) {
                    return children
                } else {
                    <Redirect to="/" />
                }
            }}
        />
    )
}

export default ProtectedRoute2