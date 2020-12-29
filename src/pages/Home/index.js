import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllCategories, getRandomMeal } from 'api/mealDb';
import Meal from 'components/Meal';

import 'pages/Home/Home.css';

const Home = () => {
    const history = useHistory();

    const [meal, setMeal] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        document.title = 'Cookbook app';
        const fetchData = async () => {
            try {
                const meal = await getRandomMeal();
                setMeal(meal.meals[0]);
                const allCategories = await getAllCategories();
                setCategories(allCategories.categories);
            } catch (e) { }
        };
        fetchData();
    }, [])

    return (
        <div className='meal-categories-wrap'>
            <div className='meal-categories'>
                <div className='meal-categories-title'>
                    Categories
                </div>
                {categories.map(category =>
                    <button className='meal-categories-btn' onClick={() => history.push('category/' + category.strCategory)}>
                        {category.strCategory}
                    </button>
                )}
            </div>
            <Meal meal={meal} setMeal={setMeal} home={true} />
        </div >
    )
}

export default Home;
