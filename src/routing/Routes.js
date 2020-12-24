import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'pages/Home/index'
import MyRecipes from 'pages/MyRecipes/index';

import 'routing/Routes.css'


const Routes = () => {
    return (
        <div className='content-container'>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/myRecipes" component={MyRecipes} />
            </Switch>
        </div>
    );
}

export default Routes;
