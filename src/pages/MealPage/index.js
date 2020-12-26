import React, { useEffect, useState } from 'react'
import { getMealbyId } from 'api/mealDb';
import Meal from 'components/Meal';


const MealPage = ({ match }) => {

    const [meal, setMeal] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const mealId = match.params.id;
            try {
                const data = await getMealbyId(mealId);
                setMeal(data.meals[0]);
            } catch (e) { }
        };
        fetchData();
    }, [match.params.id])

    return (
        <>
            <Meal meal={meal} setMeal={setMeal} home={false}></Meal>
        </>
    )
}

export default MealPage
