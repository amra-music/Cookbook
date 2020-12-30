import React, { useEffect, useState } from 'react'
import { getMealsbyCategory } from 'api/mealDb';
import BasicMeal from 'components/BasicMeal';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const CategoryPage = ({ match }) => {

    const history = useHistory();
    const [categoryMeals, setCategoryMeals] = useState([]);

    useEffect(() => {
        document.title = 'Categories | Cookbook app';
        const fetchData = async () => {
            const category = match.params.category;
            try {
                const data = await getMealsbyCategory(category);
                if (data.meals === null)
                    data.meals = [];
                setCategoryMeals(data.meals);
            } catch (e) { }
        };
        fetchData();
    }, [match.params])

    return (
        <div className='my-meals-container'>
            <FaArrowLeft className='icon-btn arrow-icon' onClick={() => history.goBack()} />
            <div className='basic-meals-container'>
                {categoryMeals.map(meal => <BasicMeal meal={meal} />)}
            </div>
        </div>
    )
}

export default CategoryPage;
