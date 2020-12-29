const userItem = 'cookbook-user';
const tokenItem = 'cookbook-token';

export const getToken = () => {
    return localStorage.getItem(tokenItem) || "";
}

export const setSession = (user, token) => {
    localStorage.setItem(tokenItem, token);
    localStorage.setItem(userItem, JSON.stringify(user));
}

export const removeSession = () => {
    localStorage.removeItem(tokenItem);
    localStorage.removeItem(userItem);
}
