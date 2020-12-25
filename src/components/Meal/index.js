import React, { useEffect } from 'react';
import 'components/Meal/Meal.css';
import { Button } from 'react-bootstrap';
import { getRandomMeal } from 'api/meals';

const Meal = ({ meal, home }) => {


    useEffect(() => {

    }, []);

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
            meal = data.meals[0];
        } catch (e) { }
    }

    return (
        <div className={home ? 'meal-container-home' : 'meal-container'}>
            <div className='meal-title'>{meal.strMeal}</div>
            <div className='meal-body' style={!home ? { 'flex-wrap': 'wrap' } : null}>
                <img className='meal-image' alt='Meal' src={meal.strMealThumb} style={{ width: 300, height: 300 }}></img>
                <div className='meal-about'>
                    <div className='meal-ingredients'>
                        <table className='meal-ingredients-table'>
                            {getIngredients().map(element =>
                                <tr>
                                    <td>{element.ingredient}</td>
                                    <td>{element.measure}</td>
                                </tr>)}
                        </table>
                    </div>
                    {home ? <Button className='meal-about-btn'>See more</Button> : null}
                </div>
                {!home ? <div className='meal-instructions'>{meal.strInstructions}</div> : null}
            </div>
        </div>
    );
}

export default Meal;
