import React from 'react';
import { Button } from 'react-bootstrap';
import { getRandomMeal } from 'api/meals';
import { useHistory } from 'react-router-dom';
import { FaYoutube, FaBookmark, FaRandom, FaEdit } from 'react-icons/fa'

import 'components/Meal/Meal.css';

const Meal = ({ meal, setMeal, home }) => {

    const history = useHistory();
    var calcHeight = 0;

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

        if (ingredients.length <= 10) calcHeight = 350;
        else if (ingredients.length <= 15) calcHeight = 400;
        else calcHeight = 500;

        console.log(calcHeight);

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
                    <div className='meal-about-image'>
                        <img className='meal-image' alt='Meal' src={meal.strMealThumb} style={{ width: 300, height: 300 }}></img>
                        {home ?
                            <Button className='square-btn' onClick={() => history.push('meal/' + meal.idMeal)} >View more</Button>
                            : null
                        }
                    </div>
                    <div className='meal-about'>
                        <div className='meal-ingredients' style={home ? { 'height': { calcHeight } } : null}>
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
                    </div>
                    {!home ? <div className='meal-instructions'>{meal.strInstructions}</div> : null}
                </div>
            </div>
            <div className='meal-buttons-container'>
                {home ? <button className='icon-btn' onClick={getNewMeal}><FaRandom /></button> : null}
                <button className='icon-btn'><FaEdit /></button>
                {meal.strYoutube !== '' ? <a className='youtube-btn' rel='noreferrer' target='_blank' href={meal.strYoutube}><FaYoutube /></a> : null}
                <button className='square-btn'><FaBookmark className='save-icon' /> Save to collection</button>
            </div>
        </div>
    );
}

export default Meal;
