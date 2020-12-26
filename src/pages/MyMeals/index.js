import React, { useEffect, useState } from 'react'
import { getMyMeals } from 'api/backend';
import { saveAs } from 'file-saver';
import BasicMeal from 'components/BasicMeal';

import 'pages/MyMeals/MyMeals.css'

const MyMeals = () => {

    const [myMeals, setMyMeals] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMyMeals();
                setMyMeals(response);
            }
            catch (e) { }
        };
        fetchData();
    }, []);

    const exportJson = () => {
        const blob = new Blob([JSON.stringify(myMeals, null, 2)], { type: 'application/json' });
        saveAs(blob, 'myMeals.json');
    }

    return (
        <div className='my-meals-container'>
            <div className='basic-meals-container'>
                {myMeals.map(meal => <BasicMeal meal={meal} />)}
            </div>
            <button className='square-btn' style={{float:'right'}} onClick={exportJson}>Export as .json file</button>
        </div>
    )
}

export default MyMeals;
