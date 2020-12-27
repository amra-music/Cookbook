import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'pages/Home/index'
import MyMeals from 'pages/MyMeals/index';
import MealPage from 'pages/MealPage/index';
import CategoryPage from 'pages/CategoryPage/index';

import 'routing/Routes.css'


const Routes = () => {
    return (
        <div className='content-container'>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/my_meals" component={MyMeals} />
                <Route path="/meal/:id" component={MealPage} />
                <Route path="/category/:category" component={CategoryPage} />
            </Switch>
        </div>
    );
}

export default Routes;
