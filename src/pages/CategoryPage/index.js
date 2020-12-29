import React, { useEffect, useState } from 'react'
import { getMealsbyCategory } from 'api/mealDb';
import BasicMeal from 'components/BasicMeal';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import 'pages/CategoryPage/CategoryPage.css'

const CategoryPage = ({ match }) => {

    const history = useHistory();
    const [categoryMeals, setCategoryMeals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const category = match.params.category;
            try {
                const data = await getMealsbyCategory(category);
                setCategoryMeals(data.meals);
            } catch (e) { }
        };
        fetchData();
    }, [match.params])

    return (
        <div className='my-meals-container'>
            <FaArrowLeft className='icon-btn arrow-icon' onClick={() => history.goBack()}></FaArrowLeft>
            <div className='basic-meals-container'>
                {categoryMeals.map(meal => <BasicMeal meal={meal} />)}
            </div>
        </div>
    )
}

export default CategoryPage;
