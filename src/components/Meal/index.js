import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { getRandomMeal } from 'api/mealDb';
import { saveMeal } from 'api/backend';
import { FaYoutube, FaBookmark, FaRandom, FaEdit, FaArrowLeft } from 'react-icons/fa';

import 'components/Meal/Meal.css';

const Meal = ({ meal, setMeal, home }) => {

    const history = useHistory();
    const [response, setResponse] = useState(null);

    const getIngredients = () => {
        let ingredients = [];
        const strIngredient = "strIngredient";
        const strMeasure = "strMeasure";

        for (let i = 1; i <= 20; i++) {
            const newStrIngredient = strIngredient + i;
            if (meal[newStrIngredient] === "" || meal[newStrIngredient] === null) break;
            const newStrMeasure = strMeasure + i;
            const pair = {
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
        setResponse(null);
    }

    const save = async () => {
        try {
            const response = await saveMeal(meal);
            setResponse(response);
        }
        catch (e) { }
    }

    return (
        <div className='meal-container-wrap'>
            {!home ? <button className='icon-btn arrow-icon' style={{ float: 'left' }} onClick={() => history.goBack()}><FaArrowLeft /></button> : null}
            {response !== null ? <Alert className='meal-alert' variant='purple' style={home ? { width: '80%' } : { width: '100%' }} dismissible onClose={() => setResponse(null)} >{response}</Alert> : null}
            <div className={home ? 'meal-container-home' : 'meal-container'}>
                <div className='meal-title'>{meal.strMeal}</div>
                <div className='meal-body' style={!home ? { 'flexWrap': 'wrap' } : null}>
                    <div className='meal-about-image'>
                        <img className='meal-image' alt='Meal' src={meal.strMealThumb} style={{ width: 300, height: 300 }}></img>
                        {home ?
                            <button className='square-btn' onClick={() => history.push('meal/' + meal.idMeal)} >View more</button>
                            : null
                        }
                    </div>
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
                    </div>
                    {!home ? <div className='meal-instructions'>{meal.strInstructions}</div> : null}
                </div>
            </div>
            <div className='meal-buttons-container'>
                {home ? <button className='icon-btn' onClick={getNewMeal}><FaRandom /></button> : null}
                <button className='icon-btn'><FaEdit /></button>
                {meal.strYoutube !== '' ? <a className='youtube-btn' rel='noreferrer' target='_blank' href={meal.strYoutube}><FaYoutube /></a> : null}
                <button className='square-btn' onClick={save} ><FaBookmark className='save-icon' /> Save to collection</button>
            </div>
        </div>
    );
}

export default Meal;
