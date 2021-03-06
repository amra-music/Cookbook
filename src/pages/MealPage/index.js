import React, { useEffect, useState } from 'react';
import { getMealbyId } from 'api/mealDb';
import Meal from 'components/Meal';
import { useHistory } from 'react-router-dom';


const MealPage = ({ match }) => {
    const history = useHistory();

    const [meal, setMeal] = useState(history.location.state === undefined ? {} : history.location.state.meal);

    useEffect(() => {
        document.title = 'About meal | Cookbook app';
        const fetchData = async () => {
            const mealId = match.params.id;
            try {
                const data = await getMealbyId(mealId);
                setMeal(data.meals[0]);
            } catch (e) { }
        };
        if (Object.keys(meal).length === 0 || meal.strInstructions === undefined)
            fetchData();
    }, [match.params.id, meal])

    return (
        <Meal meal={meal} setMeal={setMeal} home={false} />
    )
}

export default MealPage;
