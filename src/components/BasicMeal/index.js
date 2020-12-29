import React from 'react';
import { useHistory } from 'react-router-dom';
import { TiDeleteOutline } from 'react-icons/ti';
import { deleteMeal } from 'api/backend';

import 'components/BasicMeal/BasicMeal.css'

const BasicMeal = ({ meal, myMeals, setMyMeals }) => {

    const history = useHistory();

    const deleteClick = async (name) => {
        try {
            await deleteMeal(name);
            setMyMeals(myMeals.filter((meal) => meal.strMeal !== name));
        }
        catch (e) { }
    }

    const aboutMeal = () => history.push({ pathname: '/meal/' + meal.idMeal, state: { meal } })

    return (
        <div className='basic-meal-container' >
            {history.location.pathname === '/my_meals' ?
                <TiDeleteOutline className='delete-icon' onClick={() => deleteClick(meal.strMeal)} />
                : null
            }
            <img className='basic-meal-image' alt='Meal' src={meal.strMealThumb} style={{ width: 200, height: 200 }} onClick={aboutMeal}></img>
            <h4 className='basic-meal-title' onClick={aboutMeal}>{meal.strMeal}</h4>
        </div>
    )
}

export default BasicMeal;
