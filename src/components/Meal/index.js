import React from 'react';
import { Button } from 'react-bootstrap';
import { getRandomMeal } from 'api/meals';
import { useHistory } from 'react-router-dom';

import 'components/Meal/Meal.css';

const Meal = ({ meal, setMeal, home }) => {

    const history = useHistory();

    const getIngredients = () => {
        let ingredients = [];
        let strIngredient = "strIngredient";
        let strMeasure = "strMeasure";

        for (let i = 1; i <= 20; i++) {
            let newStrIngredient = strIngredient + i;
            if (meal[newStrIngredient] === "" || meal[newStrIngredient] === null) break;
            let newStrMeasure = strMeasure + i;
            let pair = {
                "ingredient": meal[newStrIngredient],
                "measure": meal[newStrMeasure]
            }
            ingredients.push(pair);
        }
        return ingredients;
    }

    const getNewMeal = async () => {
        try {
            const data = await getRandomMeal();
            setMeal(data.meals[0]);
        } catch (e) { }
    }

    return (
        <div className='meal-container-wrap'>
            <div className={home ? 'meal-container-home' : 'meal-container'}>
                <div className='meal-title'>{meal.strMeal}</div>
                <div className='meal-body' style={!home ? { 'flexWrap': 'wrap' } : null}>
                    <img className='meal-image' alt='Meal' src={meal.strMealThumb} style={{ width: 300, height: 300 }}></img>
                    <div className='meal-about'>
                        <div className='meal-ingredients'>
                            <table className='meal-ingredients-table'>
                                <tbody>
                                    {getIngredients().map(element =>
                                        <tr>
                                            <td>{element.ingredient}</td>
                                            <td>{element.measure}</td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                        {home ?
                            <Button className='meal-about-btn' onClick={() => history.push('meal/' + meal.idMeal)} >See more</Button>
                            : null
                        }
                    </div>
                    {!home ? <div className='meal-instructions'>{meal.strInstructions}</div> : null}
                </div>
            </div>
            <div className='meal-buttons-container'>
                {home ? <Button className='radnom-meal-btn' onClick={getNewMeal}>Radnom</Button> : null}
                {meal.strYoutube !== '' ? <Button className='youtube-btn' type="button" target='_blank' href={meal.strYoutube}>YouTube</Button> : null}
                <Button className='save-btn'>Save</Button>
                <Button className='edit-btn'>Edit</Button>
            </div>
        </div>
    );
}

export default Meal;
