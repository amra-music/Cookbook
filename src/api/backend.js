import axios from 'axios';
import { backendUrl } from 'api/common';

export const getMyMeals = async () => {
   return (await axios.get(`${backendUrl}/get_my_meals`)).data;
} 

export const saveMeal = async (meal) => {
    return (await axios.post(`${backendUrl}/post_meal`, meal)).data;
}
