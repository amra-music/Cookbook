import axios from 'axios';

export const mealDbUrl = 'https://www.themealdb.com/api/json/v1/1';

export const getMealbyName = async (name) => {
    return (await axios.get(`${mealDbUrl}/search.php?s=${name}`)).data;
}

export const getMealbyId = async (id) => {
    return (await axios.get(`${mealDbUrl}/lookup.php?i=${id}`)).data;
}

export const getRandomMeal = async () => {
    return (await axios.get(`${mealDbUrl}/random.php`)).data;
}

export const getAllCategories = async () => {
    return (await axios.get(`${mealDbUrl}/categories.php`)).data;
}

export const getMealsbyCategory = async (category) => {
    return (await axios.get(`${mealDbUrl}/filter.php?c=${category}`)).data;
}
