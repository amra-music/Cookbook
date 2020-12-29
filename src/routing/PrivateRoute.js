import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from "utilities/localStorage";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={() => getToken() !== "" ? (<Component /> ) : (<Redirect to="/" />)}
        />
    ); 
}
export default PrivateRoute;
