import React from 'react';
import { Button } from 'react-bootstrap';
import { getRandomMeal } from 'api/meals';
import { useHistory } from 'react-router-dom';
import { FaYoutube, FaBookmark, FaRandom, FaEdit } from 'react-icons/fa'
import { saveAs } from 'file-saver';

import 'components/Meal/Meal.css';

const Meal = ({ meal, setMeal, home }) => {

    const history = useHistory();

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
    }

    const saveMeal = () => {
        // var recepti = []
        // 1) spasiti u neki niz na backend
        // post, prima meal, spasava u niz
        // get, vraca recepti
        // 2) localstorage
        /*
        const blob = new Blob([JSON.stringify([meal], null, 2)], { type: 'application/json' });
        saveAs(blob, 'test.json');
        */
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
                <button className='square-btn' onClick={saveMeal} ><FaBookmark className='save-icon' /> Save to collection</button>
            </div>
        </div>
    );
}

export default Meal;
