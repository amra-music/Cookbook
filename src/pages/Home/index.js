import React, { useEffect, useState } from 'react';
import { getRandomMeal } from 'api/meals';

import 'pages/Home/Home.css';
import Meal from 'components/Meal';

const Home = () => {

    const [meal, setMeal] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRandomMeal();
                setMeal(data.meals[0]);
            } catch (e) { }
        };
        fetchData();
    }, [])
    return (
        <>
            <Meal meal={meal} home={true} ></Meal>
        </>
    )
}

export default Home;
