import axios from 'axios';
import { mealDbUrl } from 'api/common';

export const getMealbyName = async (name) => {
    return (await axios.get(`${mealDbUrl}/search.php?s=${name})`)).data;
}

export const getRandomMeal = async () => {
    return (await axios.get(`${mealDbUrl}/random.php`)).data;
}



