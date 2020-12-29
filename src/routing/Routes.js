import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'pages/Home/index';
import MyMeals from 'pages/MyMeals/index';
import MealPage from 'pages/MealPage/index';
import CategoryPage from 'pages/CategoryPage/index';
import SearchResulPage from 'pages/SearchResultPage/index';
import NotFoundPage from 'pages/NotFoundPage/index';
import PrivateRoute from 'routing/PrivateRoute';

import 'routing/Routes.css'


const Routes = () => {
    return (
        <div className='content-container'>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/meal/:id" component={MealPage} />
                <Route path="/category/:category" component={CategoryPage} />
                <Route path="/search/:input" component={SearchResulPage} />
                <PrivateRoute path="/my_meals" component={MyMeals} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
}

export default Routes;
