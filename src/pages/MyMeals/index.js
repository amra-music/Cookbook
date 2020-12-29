import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { getMyMeals } from 'api/backend';
import { saveAs } from 'file-saver';
import { FaArrowLeft } from 'react-icons/fa'
import BasicMeal from 'components/BasicMeal';

import 'pages/MyMeals/MyMeals.css'

const MyMeals = () => {

    const history = useHistory();
    const [myMeals, setMyMeals] = useState([])

    useEffect(() => {
        document.title = 'My meals | Cookbook app';
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
            <FaArrowLeft className='icon-btn arrow-icon' onClick={() => history.goBack()}></FaArrowLeft>
            <div className='basic-meals-container'>
                {myMeals.length === 0 ? <h3>You do not have any saved meals in your collection</h3> : null}
                {myMeals.map(meal => <BasicMeal meal={meal} myMeals={myMeals} setMyMeals={setMyMeals} />)}
            </div>
            {myMeals.length !== 0 ?
                <button className='square-btn export-btn' onClick={exportJson}>Export as .json file</button>
                : null
            }
        </div>
    )
}

export default MyMeals;
