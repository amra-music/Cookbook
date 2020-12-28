import React from 'react'
import { useHistory } from 'react-router-dom'

import 'components/BasicMeal/BasicMeal.css'

const BasicMeal = ({ meal }) => {

    const history = useHistory();

    return (
        <div className='basic-meal-container' onClick={() => history.push({ pathname: '/meal/' + meal.idMeal, state: { meal } })}>
            <img className='basic-meal-image' alt='Meal' src={meal.strMealThumb} style={{ width: 200, height: 200 }}></img>
            <h4 className='basic-meal-title'>{meal.strMeal}</h4>
        </div>
    )
}

export default BasicMeal
