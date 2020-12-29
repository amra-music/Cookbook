import React, { useEffect, useState } from 'react'
import { getMealbyName } from 'api/mealDb';
import BasicMeal from 'components/BasicMeal';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import 'pages/CategoryPage/CategoryPage.css'

const SearchResulPage = ({ match }) => {

    const history = useHistory();
    const [searchResultMeals, setSearchResultMeals] = useState([]);

    useEffect(() => {
        document.title = 'Search | Cookbook app';
        const fetchData = async () => {
            const input = match.params.input;
            try {
                const data = await getMealbyName(input);
                setSearchResultMeals(data.meals);
            } catch (e) { }
        };
        fetchData();
    }, [match.params])

    return (
        <div className='my-meals-container'>
            <FaArrowLeft className='icon-btn arrow-icon' onClick={() => history.goBack()}></FaArrowLeft >
            <h2 style={{ margin: 8 }}>Search results</h2>
            <div className='basic-meals-container'>
                {searchResultMeals !== null ?
                    searchResultMeals.map(meal => <BasicMeal meal={meal} />)
                    :
                    <h3 style={{ margin: 8 }}>There are no meals with this name</h3>}
            </div>
        </div >
    )
}

export default SearchResulPage;
