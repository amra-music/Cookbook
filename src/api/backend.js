import axios from 'axios';
import { getToken } from "utilities/localStorage";

export const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getMyMeals = async () => {
    return (await axios.get(`${backendUrl}/get_my_meals`, {
        headers: {
            'x-access-token': getToken()
        }
    })).data;
}

export const saveMeal = async (meal) => {
    return (await axios.post(`${backendUrl}/post_meal`, meal, {
        headers: {
            'x-access-token': getToken()
        }
    })).data;
}

export const deleteMeal = async (name) => {
    return (await axios.delete(`${backendUrl}/delete_meal`,
        {
            data: {
                "strMeal": name
            },
            headers: {
                'x-access-token': getToken()
            }
        }
    )).data;
}

export const loginUser = async (user) => {
    return (await axios.post(backendUrl + '/auth/login', user)).data;
};
